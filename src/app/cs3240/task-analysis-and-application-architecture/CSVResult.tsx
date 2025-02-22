"use client";
interface CsvResultProps {
    matrix: string[][] | null;
}

export function CsvResult({ matrix }: CsvResultProps) {
    return (
        <>
            {matrix && (
                <pre style={{ maxHeight: "200px", overflow: "auto" }}>
          {JSON.stringify(matrix, null, 2)}
        </pre>
            )}
        </>
    );
}