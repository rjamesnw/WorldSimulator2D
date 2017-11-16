interface IGPUOutputDimensions { x: number, y?: number, z?: number }

interface IKernalBasae {
    (...args: any[]): any;
    setOutput(output: number[] | IGPUOutputDimensions): this;
    setFunctions(functions: IKernalFuncrtion[]): this;
    setGraphical(flag: boolean): this;
    getCanvas(): HTMLCanvasElement;
}

interface IKernalObjectResult {
    [name: string]: number[];
    result: number[];
}

interface IKernalObjectFunction extends IKernalBasae {
    (...args: any[]): IKernalObjectResult;
}

interface IKernalArrayResult extends Array<number[]> {
    result: number[]
}

interface IKernalArrayFunction extends IKernalBasae {
    (...args: any[]): IKernalArrayResult;
}

interface IGPUOoptoins {
    output?: IGPUOutputDimensions | number[] | number[][] | number[][][];
    constants?: { [name: string]: number }
    mode?: 'cpu' | 'gpu';
}

interface IKernalFuncrtion { (...args: any[]): any }

interface IKernalMap {
    [name: string]: IKernalFuncrtion
}

declare class GPU {
    createKernel(f: IKernalFuncrtion, opt?: IGPUOoptoins): IKernalBasae;
    createKernelMap(map: IKernalMap, f: IKernalFuncrtion, opt?: IGPUOoptoins): IKernalObjectFunction;
    createKernelMap(map: Array<IKernalFuncrtion>, f: IKernalFuncrtion, opt?: IGPUOoptoins): IKernalArrayFunction;
    addFunction(f: IKernalFuncrtion): void;
}

interface IKernalThreadContext {
    thread: { x: number, y?: number, z?: number };
    constants?: {};
}

