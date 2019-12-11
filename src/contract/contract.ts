import { ParameterSchema, Schema } from '@taquito/michelson-encoder';
import { EntrypointsResponse, ScriptResponse } from '@taquito/rpc';
import { ContractProvider } from './interface';
import { InvalidParameterError } from './errors';

interface SendParams {
  fee?: number;
  storageLimit?: number;
  gasLimit?: number;
  amount?: number;
}

const DEFAULT_SMART_CONTRACT_METHOD_NAME = 'main';

/**
 * @description Utility class to send smart contract operation
 */
export class ContractMethod {
  constructor(
    private provider: ContractProvider,
    private address: string,
    private parameterSchema: ParameterSchema,
    private name: string,
    private args: any[],
    private isMultipleEntrypoint = true,
    private isAnonymous = false
  ) {}

  /**
   * @description Get the schema of the smart contract method
   */
  get schema() {
    return this.isAnonymous
      ? this.parameterSchema.ExtractSchema()[this.name]
      : this.parameterSchema.ExtractSchema();
  }

  /**
   *
   * @description Send the smart contract operation
   *
   * @param Options generic operation parameter
   */
  send({ fee, gasLimit, storageLimit, amount = 0 }: Partial<SendParams> = {}) {
    return this.provider.transfer({
      to: this.address,
      amount,
      fee,
      gasLimit,
      storageLimit,
      parameter: {
        entrypoint: this.isMultipleEntrypoint ? this.name : 'default',
        value: this.isAnonymous
          ? this.parameterSchema.Encode(this.name, ...this.args)
          : this.parameterSchema.Encode(...this.args),
      } as any,
      rawParam: true,
    });
  }
}

const validateArgs = (args: any[], schema: ParameterSchema, name: string) => {
  const sigs = schema.ExtractSignatures();

  if (!sigs.find((x: any[]) => x.length === args.length)) {
    throw new InvalidParameterError(name, sigs, args);
  }
};

/**
 * @description Utility class to send smart contract operation
 */
export class LegacyContractMethod {
  constructor(
    private provider: ContractProvider,
    private address: string,
    private parameterSchema: ParameterSchema,
    private name: string,
    private args: any[]
  ) {}

  /**
   * @description Get the schema of the smart contract method
   */
  get schema() {
    return this.parameterSchema.isMultipleEntryPoint
      ? this.parameterSchema.ExtractSchema()[this.name]
      : this.parameterSchema.ExtractSchema();
  }

  /**
   *
   * @description Send the smart contract operation
   *
   * @param Options generic operation parameter
   */
  send({ fee, gasLimit, storageLimit, amount = 0 }: Partial<SendParams> = {}) {
    return this.provider.transfer({
      to: this.address,
      amount,
      fee,
      gasLimit,
      storageLimit,
      parameter: this.parameterSchema.isMultipleEntryPoint
        ? this.parameterSchema.Encode(this.name, ...this.args)
        : this.parameterSchema.Encode(...this.args),
      rawParam: true,
    });
  }
}
/**
 * @description Smart contract abstraction
 */
export class Contract {
  /**
   * @description Contains methods that are implemented by the target Tezos Smart Contract, and offers the user to call the Smart Contract methods as if they were native TS/JS methods.
   * NB: if the contract contains annotation it will include named properties; if not it will be indexed by a number.
   *
   */
  public methods: { [key: string]: (...args: any[]) => ContractMethod | LegacyContractMethod } = {};

  public readonly schema: Schema;

  public readonly parameterSchema: ParameterSchema;

  constructor(
    public readonly address: string,
    public readonly script: ScriptResponse,
    private provider: ContractProvider,
    private entrypoints?: EntrypointsResponse
  ) {
    this.schema = Schema.fromRPCResponse({ script: this.script });
    this.parameterSchema = ParameterSchema.fromRPCResponse({ script: this.script });
    if (!this.entrypoints) {
      this._initializeMethodsLegacy(address, provider);
    } else {
      this._initializeMethods(address, provider, this.entrypoints.entrypoints);
    }
  }

  private _initializeMethods(
    address: string,
    provider: ContractProvider,
    entrypoints: {
      [key: string]: object;
    }
  ) {
    const parameterSchema = this.parameterSchema;
    const keys = Object.keys(entrypoints);
    if (parameterSchema.isMultipleEntryPoint) {
      keys.forEach(smartContractMethodName => {
        const method = function(...args: any[]) {
          const smartContractMethodSchema = new ParameterSchema(
            entrypoints[smartContractMethodName]
          );

          validateArgs(args, smartContractMethodSchema, smartContractMethodName);

          return new ContractMethod(
            provider,
            address,
            smartContractMethodSchema,
            smartContractMethodName,
            args
          );
        };
        this.methods[smartContractMethodName] = method;
      });

      // Deal with methods with no annotations which were not discovered by the RPC endpoint
      // Methods with no annotations are discovered using parameter schema
      const anonymousMethods = Object.keys(parameterSchema.ExtractSchema()).filter(
        key => Object.keys(entrypoints).indexOf(key) === -1
      );

      anonymousMethods.forEach(smartContractMethodName => {
        const method = function(...args: any[]) {
          validateArgs(
            [smartContractMethodName, ...args],
            parameterSchema,
            smartContractMethodName
          );
          return new ContractMethod(
            provider,
            address,
            parameterSchema,
            smartContractMethodName,
            args,
            false,
            true
          );
        };
        this.methods[smartContractMethodName] = method;
      });
    } else {
      const smartContractMethodSchema = this.parameterSchema;
      const method = function(...args: any[]) {
        validateArgs(args, parameterSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME);
        return new ContractMethod(
          provider,
          address,
          smartContractMethodSchema,
          DEFAULT_SMART_CONTRACT_METHOD_NAME,
          args,
          false
        );
      };
      this.methods[DEFAULT_SMART_CONTRACT_METHOD_NAME] = method;
    }
  }

  private _initializeMethodsLegacy(address: string, provider: ContractProvider) {
    const parameterSchema = this.parameterSchema;
    const paramSchema = this.parameterSchema.ExtractSchema();

    if (this.parameterSchema.isMultipleEntryPoint) {
      Object.keys(paramSchema).forEach(smartContractMethodName => {
        const method = function(...args: any[]) {
          validateArgs(
            [smartContractMethodName, ...args],
            parameterSchema,
            smartContractMethodName
          );
          return new LegacyContractMethod(
            provider,
            address,
            parameterSchema,
            smartContractMethodName,
            args
          );
        };
        this.methods[smartContractMethodName] = method;
      });
    } else {
      this.methods[DEFAULT_SMART_CONTRACT_METHOD_NAME] = function(...args: any[]) {
        validateArgs(args, parameterSchema, DEFAULT_SMART_CONTRACT_METHOD_NAME);
        return new LegacyContractMethod(
          provider,
          address,
          parameterSchema,
          DEFAULT_SMART_CONTRACT_METHOD_NAME,
          args
        );
      };
    }
  }

  /**
   * @description Return a friendly representation of the smart contract storage
   */
  public storage<T>() {
    return this.provider.getStorage<T>(this.address, this.schema);
  }

  /**
   *
   * @description Return a friendly representation of the smart contract big map value
   *
   * @param key BigMap key to fetch
   */
  public bigMap(key: string) {
    // tslint:disable-next-line: deprecation
    return this.provider.getBigMapKey(this.address, key, this.schema);
  }
}
