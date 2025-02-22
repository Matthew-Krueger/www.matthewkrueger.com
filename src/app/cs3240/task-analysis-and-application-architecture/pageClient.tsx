"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {useCsvWorker} from "@/app/cs3240/task-analysis-and-application-architecture/useCSVWorker";
import {CsvUploader} from "@/app/cs3240/task-analysis-and-application-architecture/CSVUploader";
import StaticSection from "@/components/StaticSection";
import {VisualizationsComponent} from "@/app/cs3240/task-analysis-and-application-architecture/VisualizationComponent";


export default function TaskAnalysisAndApplicationArchitecture_Client() {
    const {isComplete, error, matrix, parseCsv, setIsComplete, uniqueTasks, uniqueCategories, analyseMatrix, analysedData} = useCsvWorker();

    return (<>
            {isComplete === 'notStarted' &&
                <StaticSection className={"w-[90%] flex flex-col items-center justify-center text-center"}>
                    <h1 className="text-4xl font-bold mb-4 text-center">Please Upload a CSV file to get started</h1>
                    <CsvUploader onFileSelectAction={parseCsv}/>
                </StaticSection>}

            {isComplete === 'error' && <StaticSection className={"w-[90%]"}>
                <h1 className="text-4xl font-bold mb-4 text-center">An Error Occurred: {error}</h1>
                <CsvUploader onFileSelectAction={parseCsv}/>
            </StaticSection>}

            {isComplete === 'loading' && <StaticSection className={"w-[90%]"}>
                <h1 className="text-4xl font-bold mb-4 text-center">Processing your file.......</h1>
            </StaticSection>}

            {isComplete === 'loaded' && <StaticSection className={"w-[90%]"}>

                <h1 className="text-4xl font-bold mb-4 text-center">CSV Uploaded Successfully</h1>
                <Button className={"m-5 mx-auto block"} onClick={analyseMatrix}>Continue to Analysis</Button>
                <Button onClick={() => setIsComplete('notStarted')} className={"m-5 mx-auto block"}>Clear and Upload
                    Again</Button>
                <section className="p-6 mt-5 bg-gray-400 dark:bg-gray-600 rounded-lg shadow-lg">
                    {
                        uniqueTasks.length > 0 &&
                        <p className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Unique Tasks: <span>{uniqueTasks.join(', ')}</span>
                        </p>
                    }
                    {
                        uniqueCategories.length > 0 &&
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Unique Categories: <span>{uniqueCategories.join(', ')}</span>
                        </p>
                    }
                </section>
                {matrix && <CSTable source={matrix}/>}

            </StaticSection>}

            {isComplete === 'analysing' && <StaticSection className={"w-[90%]"}>
                <h1 className="text-4xl font-bold mb-4 text-center">Analysing......</h1>
            </StaticSection>}

            {isComplete === 'complete' && <StaticSection className={"w-[90%]"}>
                <h1 className="text-4xl font-bold mb-4 text-center">Analysis Complete</h1>
                <Button onClick={() => setIsComplete('notStarted')} className={"m-5 mx-auto block"}>Clear and Upload
                    Again</Button>
                {analysedData && <VisualizationsComponent analysedData={analysedData} />}
            </StaticSection>}
        </>
    );
}

/**
 * Takes a row major matrix and converts it into a table
 */
const CSTable = React.memo(({source}: { source: string[][] }) => {

    const [firstRow, ...restOfRows] = source;

    return <Table className={"overflow-x-auto"}>
        <TableHeader>
            <TableRow>
                {firstRow.map((entry, index) => {
                    return (
                        <TableHead key={JSON.stringify({entry, index})}>
                            {entry}
                        </TableHead>
                    )
                })}
            </TableRow>
        </TableHeader>
        <TableBody>
            {restOfRows.map((row, index) => <CSTableRow index={index} row={row} key={JSON.stringify({row, index})} />)}
        </TableBody>

    </Table>
});
CSTable.displayName = "CSTable";

const CSTableRow = React.memo(({row, index}: { row: string[], index: number }) => {
    return (
        <TableRow className={cn(
            index % 2 === 0 ? 'bg-slate-100 dark:bg-slate-700' : 'bg-slate-200 dark:bg-slate-800',
            'text-slate-900 dark:text-slate-100'
        )}>
            {row.map((cell, cellIndex) =>
                <CSTableEntry key={JSON.stringify({row, cell, cellIndex})} entry={cell} rowId={index} entryId={cellIndex} />
            )}
        </TableRow>
    )
});
CSTableRow.displayName = "CSTableRow";

const CSTableEntry = React.memo(({entry, rowId, entryId}: { entry: string, rowId: number, entryId: number }) => {
    return <TableCell key={JSON.stringify({entry, rowId, entryId})} className={"w-auto"}>
        {entry}
    </TableCell>
});
CSTableEntry.displayName = "CSTableEntry";