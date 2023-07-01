import {performance} from "perf_hooks";

function measureMemoryUsage() {
    const used = process.memoryUsage();
    return {
        rss: convertBytesToMB(used.rss),
        heapTotal: convertBytesToMB(used.heapTotal),
        heapUsed: convertBytesToMB(used.heapUsed),
        external: convertBytesToMB(used.external)
    };
}

function measureCPUUsage(startTime: number, startUsage: any) {
    const elapsedTime = performance.now() - startTime;
    const elapsedUsage = process.cpuUsage(startUsage);
    const cpuUsagePercent = (elapsedUsage.user + elapsedUsage.system) / (elapsedTime * 1000) * 100;

    return cpuUsagePercent.toFixed(2);
}
function convertBytesToMB(bytes: number) {
    return (bytes / 1000000).toFixed(2);
}

function simpleEffort(data: any) {
    let result = 1
    for (let i = 0; i < 11; i++){
        result *= i
    }
    return {"message": result}
}


export {simpleEffort, convertBytesToMB, measureMemoryUsage, measureCPUUsage}
