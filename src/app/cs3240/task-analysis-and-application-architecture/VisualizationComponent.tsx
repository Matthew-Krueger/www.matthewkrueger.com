import {AnalysedData} from "@/app/cs3240/task-analysis-and-application-architecture/worker";
import {ChartWrapper} from "@/app/cs3240/task-analysis-and-application-architecture/ChartWrapper";
import {cn} from "@/lib/utils";

interface VisualizationsProps {
    analysedData: AnalysedData;
}

export function VisualizationsComponent({analysedData}: VisualizationsProps) {

    console.log(JSON.stringify(analysedData));

    const containerStyles = cn(
        "flex flex-col items-center justify-center p-6 gap-8"
    );

    const outerDivStyles = cn(
        "flex flex-wrap gap-6 justify-center w-full items-stretch" // Added items-stretch
    );

    const innerDivStyles = cn(
        "flex-1 min-w-[280px] max-w-[500px] p-2" // Match ChartWrapper sizes with flex-1
    );

    const wrapperDivStyles = cn(
        "flex flex-col items-center max-w-7xl w-full"
    );

    return (
        <div className={containerStyles}>
            <div className={wrapperDivStyles}>
                <div className={outerDivStyles}>
                    {/* Overall Task Importance Bar Chart */}
                    <div className={innerDivStyles}>
                        <ChartWrapper
                            title="Overall Task Importance"
                            chartData={analysedData.overallTaskImportance}
                        />
                    </div>
                </div>

                <div className={outerDivStyles}>
                    {/* Overall Importance Distribution Pie Chart */}
                    <div className={innerDivStyles}>
                        <ChartWrapper
                            title="Overall Importance Distribution"
                            chartData={analysedData.importanceDistribution}
                        />
                    </div>
                </div>

                <div className={outerDivStyles}>
                    {/* Category Task Importance Bar Charts */}
                    {analysedData.categoryTaskImportance.map((chartData, index) => (
                        <div key={index} className={innerDivStyles}>
                            <ChartWrapper
                                title={`${chartData.category} Task Importance`}
                                chartData={chartData}
                            />
                        </div>
                    ))}
                </div>

                <div className={outerDivStyles}>
                    {/* Category Importance Distribution Pie Charts */}
                    {analysedData.categoryImportanceDistribution.map((chartData, index) => (
                        <div key={index} className={innerDivStyles}>
                            <ChartWrapper
                                title={`${chartData.category} Importance Distribution`}
                                chartData={chartData}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}