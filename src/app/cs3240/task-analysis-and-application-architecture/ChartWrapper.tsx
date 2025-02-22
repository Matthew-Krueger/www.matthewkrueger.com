import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart";
import {Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis} from "recharts";

interface ChartWrapperProps {
    title: string;
    chartData: {
        type: string;
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string | string[];
        }[];
    };
}

function transformBarData(input: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
}) {
    const { labels, datasets } = input;
    const dataset = datasets[0];
    const data = labels.map((label, index) => ({
        task: label,
        importance: dataset.data[index],
    }));
    const config = {
        importance: {
            label: dataset.label,
            color: dataset.backgroundColor,
        },
    };
    return { data, config };
}

function transformPieData(input: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
}) {
    const { labels, datasets } = input;
    const dataset = datasets[0];
    const data = labels.map((label, index) => ({
        name: label,
        value: dataset.data[index],
    }));
    const colors = dataset.backgroundColor;
    return { data, colors };
}

export function ChartWrapper({ title, chartData }: ChartWrapperProps) {
    if (chartData.type === "bar") {
        const { data, config } = transformBarData(chartData as never);
        return (
            <Card className="w-full min-w-[280px] max-w-[500px]"> {/* Adjusted min/max */}
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]"> {/* Removed min-h, kept fixed height */}
                    <ChartContainer
                        config={config}
                        className="w-full h-full" // Use full height of container
                    >
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="task"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            <Bar
                                dataKey="importance"
                                fill={config.importance.color}
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        );
    } else if (chartData.type === "pie") {
        const { data, colors } = transformPieData(chartData as never);
        const legendConfig = Object.fromEntries(
            data.map((entry, index) => [
                entry.name,
                {
                    label: entry.name,
                    color: colors[index % colors.length]
                }
            ])
        );

        return (
            <Card className="w-full min-w-[280px] max-w-[500px]"> {/* Adjusted min/max */}
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px]"> {/* Removed min-h, kept fixed height */}
                    <ChartContainer
                        config={legendConfig}
                        className="w-full h-full" // Use full height of container
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend
                                content={<ChartLegendContent />}
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card className="w-full min-w-[280px] max-w-[500px]">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>Unsupported chart type</div>
                </CardContent>
            </Card>
        );
    }
}