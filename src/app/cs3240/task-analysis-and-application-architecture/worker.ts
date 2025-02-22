import Papa from 'papaparse';

export type AnalysedData = {
    // Bar chart data for overall task importance
    overallTaskImportance: {
        type: 'bar';
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
        }[];
    };

    // Bar chart data for each category's task importance
    categoryTaskImportance: {
        type: 'bar';
        category: string;
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string;
        }[];
    }[];

    // Pie chart data for high/medium/low distribution
    importanceDistribution: {
        type: 'pie';
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    };

    // Category-specific pie charts
    categoryImportanceDistribution: {
        type: 'pie';
        category: string;
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    }[];
};

// Define the worker message interface
type WorkerMessageError = {
    type: 'error';
    data: string;
};

type WorkerMessageCsvParsed = {
    type: 'csvParsed';
    data: {
        matrix: string[][],
        uniqueCategories: string[],
        uniqueTasks: string[]
    };
}

type WorkerMessageParseCSV = {
    type: 'parseCsv';
    data: File;
};

type WorkerMessageDataAnalyse = {
    type: 'dataAnalyse';
    data: {
        matrix: string[][],
        uniqueCategories: string[],
        uniqueTasks: string[]
    };
}

type WorkerMessageDataAnalysed = {
    type: 'dataAnalysed';
    data: AnalysedData;
}

export type WorkerMessage =   WorkerMessageError
                            | WorkerMessageCsvParsed
                            | WorkerMessageParseCSV
                            | WorkerMessageDataAnalyse
                            | WorkerMessageDataAnalysed;

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const { type, data } = event.data;

    switch (type) {
        case 'parseCsv':
            parseCSV(data);
            break;

        case 'dataAnalyse':
            self.postMessage(analyseData(data));
            break;

        default:
            postError(new Error('Invalid message type.'));
    }
};

const postError = (error: Error) => {
    self.postMessage({
        type: 'error',
        data: `${error.name}: ${error.message} (Cause: ${error.cause})`,
    } as WorkerMessageError);
}

/**
 * Processes a parsed CSV matrix, extracts headers, and posts the data back to the main thread.
 *
 * @param {string[][]} matrix - A 2D array representing a parsed CSV file where rows and columns are arrays of strings.
 * @returns {void}
 *
 * This function performs the following tasks:
 * - Extracts column headers from the provided matrix.
 * - Extracts row headers from the provided matrix.
 * - Logs the extracted headers for debugging purposes.
 * - Sends a message back to the main thread containing the processed CSV data along with unique categories and tasks.
 *
 * The posted message includes:
 * - type: A string identifier signifying the message type (`csvParsed`).
 * - data: An object containing the matrix, unique row header categories, and unique column header tasks.
 */
const postCsvParsed = (matrix: string[][]): void => {
    // Extract column headers from the matrix
    const columnHeaders = grabColumnHeaderLabels(matrix);

    // Extract row headers from the matrix
    const rowHeaders = grabRowHeaderLabels(matrix);

    // Special case to convert the labels:
    matrix[0][0] = "USER";

    // Post a message back to the main thread with the parsed data
    self.postMessage({
        type: 'csvParsed',
        data: {
            matrix, // The processed CSV matrix
            uniqueCategories: rowHeaders, // Unique categories extracted from row headers
            uniqueTasks: columnHeaders, // Unique tasks extracted from column headers
        },
    } as WorkerMessageCsvParsed);
};


/**
 * Extracts column header labels from a matrix, excluding the first element
 * of the first row and deduplicating by retaining only unique suffix parts
 * of the headers starting from the 5th character.
 *
 * @param {string[][]} matrix - A two-dimensional array representing a matrix
 *                              where the first row contains column headers.
 * @returns {string[]} An array containing processed column header labels.
 *                     Returns an empty array if the matrix is empty.
 */
const grabColumnHeaderLabels = (matrix: string[][]): string[] => {
    // Validate the matrix is not empty and has at least one row
    if (matrix.length === 0) {
        return [];
    }

    // Extract the first row as column headers
    const headers = matrix[0];

    // Deduplicate headers keeping only unique XX parts
    return headers.slice(1).map(header => header.slice(5));
};


/**
 * Extracts unique row header prefixes from a two-dimensional string matrix, skipping the first row.
 *
 * The function processes the input matrix, starting from the second row, and extracts the first two
 * characters (prefix) of the first element in each row. Only unique prefixes are retained in the result.
 *
 * If the input matrix is empty, the function returns an empty array.
 *
 * @param {string[][]} matrix - A two-dimensional array of strings representing the input matrix.
 * @returns {string[]} An array of unique string prefixes from the first column of the matrix, skipping the header row.
 */
const grabRowHeaderLabels = (matrix: string[][]): string[] => {
    // Validate the matrix is not empty
    if (matrix.length === 0) {
        return [];
    }
    const uniquePrefixes = new Set<string>();


    matrix.slice(1).map(row => row[0]).filter(header => {
        const prefix = header.slice(0, 2); // Extract the first two characters
        if (uniquePrefixes.has(prefix)) {
            return false; // Skip if the prefix is already used
        }
        uniquePrefixes.add(prefix);
        return true; // Keep if the prefix is unique
    });


    // Skip the first row (header) and extract the first element of each remaining row
    return Array.from(uniquePrefixes);
};


/**
 * Parses a CSV file and processes its content.
 *
 * This function reads the provided file, checks its validity, and uses the PapaParse library
 * to parse its content. The parsed data is filtered for empty rows and then transposed.
 * The resulting data is sent to be processed further. Errors occurring during the file parsing
 * or validation are handled and reported through the `postError` function.
 *
 * @param {File} data - The CSV file to be parsed. Must be a valid file of type `text/csv` or `text/plain`.
 * @returns {undefined} This function does not return a value. Processed data or errors are handled internally and posted
 */
const parseCSV = (data: File): undefined => {
    if (!data || !(data instanceof Blob)) {
        postError(new Error('Invalid file provided. Please try again.'));
        return;
    }

    // Verify CSV MIME type
    if (!data.type.includes('csv') && !data.type.includes('text/plain')) {
        postError(new Error('Invalid file type. File must be a CSV.'));
        return;
    }

    // Use Papa.parse with a config object for local files
    Papa.parse<string[]>(data as File, {
        complete: (result: Papa.ParseResult<string[]>) => {
            const garbageCollected = result.data.filter(row =>
                row.some(element => element.trim() !== '')
            );

            const final = transposeMatrix(garbageCollected.slice(1));
            postCsvParsed(final)
        },
        error: (error: Error) => postError(error),
        header: false,
        skipEmptyLines: true,
    });
}

/**
 * Transposes the given two-dimensional string array, swapping rows with columns.
 *
 * @param {string[][]} table - A two-dimensional array representing the input matrix to be transposed.
 * @return {string[][]} A new two-dimensional array where rows and columns of the input matrix are swapped.
 */
function transposeMatrix(table: string[][]): string[][] {
    // Check if table is empty
    if (table.length === 0) return [];

    // Get number of rows and columns
    const numRows = table.length;
    const numCols = table[0].length;

    // Create new table with swapped dimensions
    const transposed: string[][] = new Array(numCols)
        .fill(null)
        .map(() => new Array(numRows));

    // Fill transposed table by swapping row and column indexes
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        for (let colIndex = 0; colIndex < numCols; colIndex++) {
            transposed[colIndex][rowIndex] = table[rowIndex][colIndex];
        }
    }

    return transposed;
}

/**
 * Analyzes the provided data and generates structured datasets for graphing.
 *
 * @param {WorkerMessageDataAnalyse['data']} input - The input data containing the matrix,
 *                                                    unique categories, and unique tasks.
 * @returns {WorkerMessageDataAnalysed} - The structured output data for various chart types.
 *
 * This function performs the following:
 * - Calculates overall averages for each task across all categories.
 * - Groups data into categories and calculates their specific averages.
 * - Generates bar chart data for overall task importance and category-specific importance.
 * - Calculates task importance distribution and generates pie chart datasets.
 * - Prepares color-coded datasets based on the importance levels.
 */
function analyseData(input: WorkerMessageDataAnalyse['data']): WorkerMessageDataAnalysed {
    const {matrix, uniqueCategories, uniqueTasks} = input;

    // Calculate averages for each task
    const taskAverages: { [task: string]: number[] } = {};
    uniqueTasks.forEach(task => taskAverages[task] = []);

    // Group data by category
    const categoryData: { [category: string]: number[][] } = {};
    uniqueCategories.forEach(cat => categoryData[cat] = []);

    // Process matrix data (skip header row)
    for (let i = 1; i < matrix.length; i++) {
        const row = matrix[i];
        const userId = row[0];
        const category = userId.substring(0, 2);

        // Collect rankings for each task
        for (let j = 1; j < row.length; j++) {
            const task = uniqueTasks[j - 1];
            const ranking = parseInt(row[j]);
            taskAverages[task].push(ranking);
            categoryData[category].push([j - 1, ranking]);
        }
    }

    // Calculate overall averages
    const overallAverages = uniqueTasks.map(task => {
        const sum = taskAverages[task].reduce((a, b) => a + b, 0);
        return sum / taskAverages[task].length;
    });

    // Calculate category-specific averages
    const categoryAverages: { [category: string]: number[] } = {};
    uniqueCategories.forEach(cat => {
        const taskSums = new Array(uniqueTasks.length).fill(0);
        const taskCounts = new Array(uniqueTasks.length).fill(0);

        categoryData[cat].forEach(([taskIdx, ranking]) => {
            taskSums[taskIdx] += ranking;
            taskCounts[taskIdx]++;
        });

        categoryAverages[cat] = taskSums.map((sum, idx) => sum / taskCounts[idx]);
    });

    // Helper function to calculate importance distributions
    const getDistribution = (averages: number[]) => {
        const distribution = {high: 0, medium: 0, low: 0};
        averages.forEach(avg => {
            if (avg <= 5) distribution.high++;
            else if (avg >= 9) distribution.low++;
            else distribution.medium++;
        });
        return distribution;
    };

    // Color schemes for categorization and importance
    const importanceColors = {
        high: '#4CAF50',   // Green for high importance
        medium: '#FFC107', // Yellow for medium
        low: '#F44336'     // Red for low
    };

    const categoryColors = {
        MG: '#2196F3', // Blue for Managers
        EX: '#9C27B0', // Purple for Executives
        SR: '#FF9800', // Orange for Senior
        JR: '#3F51B5'  // Indigo for Junior
    };

    // Return the structured graph data
    return {
        type: 'dataAnalysed',
        data: {
            overallTaskImportance: {
                type: 'bar',
                labels: uniqueTasks,
                datasets: [{
                    label: 'Average Importance',
                    data: overallAverages,
                    backgroundColor: '#2196F3'
                }]
            },

            categoryTaskImportance: uniqueCategories.map(cat => ({
                type: 'bar',
                category: cat,
                labels: uniqueTasks,
                datasets: [{
                    label: `${cat} Average Importance`,
                    data: categoryAverages[cat],
                    backgroundColor: categoryColors[cat as keyof typeof categoryColors]
                }]
            })),

            importanceDistribution: {
                type: 'pie',
                labels: ['High Importance', 'Medium Importance', 'Low Importance'],
                datasets: [{
                    label: 'Task Distribution',
                    data: [
                        getDistribution(overallAverages).high,
                        getDistribution(overallAverages).medium,
                        getDistribution(overallAverages).low
                    ],
                    backgroundColor: [
                        importanceColors.high,
                        importanceColors.medium,
                        importanceColors.low
                    ]
                }]
            },

            categoryImportanceDistribution: uniqueCategories.map(cat => ({
                type: 'pie',
                category: cat,
                labels: ['High Importance', 'Medium Importance', 'Low Importance'],
                datasets: [{
                    label: `${cat} Task Distribution`,
                    data: [
                        getDistribution(categoryAverages[cat]).high,
                        getDistribution(categoryAverages[cat]).medium,
                        getDistribution(categoryAverages[cat]).low
                    ],
                    backgroundColor: [
                        importanceColors.high,
                        importanceColors.medium,
                        importanceColors.low
                    ]
                }]
            }))
        }
    };
}
