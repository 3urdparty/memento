import { PropertyMetadata } from "nestjs-seeder/dist/interfaces";
import { Provider, Type, DynamicModule, ForwardReference } from "@nestjs/common";

declare module 'nestjs-seeder' {

  export interface Seeder {
    seed(): Promise<any>;
    drop(): Promise<any>;
  }

  export interface SeederOptions {
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    providers?: Provider[];
  }
  export interface SeederRunner {
    run(seeders: Provider<Seeder>[]): void;
  }
  export const seeder: (options: SeederOptions) => SeederRunner;

  export interface SeederModuleOptions {
    seeders: Provider<Seeder>[];
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    providers?: Provider[];
  }

  export class SeederModule {
    static register(options: SeederModuleOptions): DynamicModule;
  }

  export class FactoryMetadataStorageHost {
    private properties;
    addPropertyMetadata(metadata: PropertyMetadata): void;
    getPropertyMetadatasByTarget(target: Type<unknown>): PropertyMetadata[];
  }

  export const FactoryMetadataStorage: FactoryMetadataStorageHost;
}
