// useCsvWorker.ts
import { useEffect, useRef, useState } from "react";
import {AnalysedData, WorkerMessage} from "@/app/cs3240/task-analysis-and-application-architecture/worker";

export type CSVWorkerStatus = 'notStarted' | 'loading' | 'loaded' | 'complete' | 'error';


export function useCsvWorker() {
    const [isComplete, setIsComplete] = useState('notStarted');

    const [error, setError] = useState<string | null>(null);
    const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
    const [uniqueTasks, setUniqueTasks] = useState<string[]>([]);
    const [matrix, setMatrix] = useState<string[][] | null>(null);
    const [analysedData, setAnalysedData] = useState<AnalysedData | null>(null);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        workerRef.current = new Worker(new URL("worker.ts", import.meta.url));

        workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
            const { type, data } = event.data;
            switch (type) {
                case "csvParsed":
                    setMatrix(data.matrix as string[][]);
                    setUniqueCategories(data.uniqueCategories as string[]);
                    setUniqueTasks(data.uniqueTasks as string[]);
                    setIsComplete('loaded');
                    setError(null);
                    break;
                case "dataAnalysed":
                    setAnalysedData(data as AnalysedData);
                    setIsComplete('complete');
                    break;
                case "error":
                    setError(data as string);
                    setIsComplete('error');
                    break;
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const parseCsv = (file: File) => {
        setIsComplete('loading');
        setError(null);
        setMatrix(null);
        workerRef.current?.postMessage({ type: "parseCsv", data: file });
    };

    const analyseMatrix = () => {
        if(error != null || matrix == null){
            alert("Cannot continue! Error: " + error);
            return;
        }

        setIsComplete('analysing');
        workerRef.current?.postMessage({ type: "dataAnalyse", data: { matrix, uniqueCategories, uniqueTasks } });

    }

    return { isComplete, error, matrix, parseCsv, setIsComplete, uniqueCategories, uniqueTasks, analyseMatrix, analysedData };
}