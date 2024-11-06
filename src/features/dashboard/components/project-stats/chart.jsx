import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { RefreshCcw } from 'lucide-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { DataFactory } from '../../utils/data-factory';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Chart() {
    const currentTheme = useSelector(state => state.currentTheme.value);
    const dataViewMode = useSelector(state => state.dataViewMode.current);
    const [chartData, setChartData] = useState([]);
    const [chartKeys, setChartKeys] = useState([]);
    const [chartConfig, setChartConfig] = useState({});
    const [spinning, setSpinning] = useState(true);

    useEffect(() => {
        const fetchedActivityData =
            DataFactory.getRecentActivityData(dataViewMode);
        setChartData(fetchedActivityData);

        const projectNames = Object.keys(fetchedActivityData[0]).filter(
            key => key !== 'month'
        );
        setChartKeys(projectNames);

        const chartConfiguration = projectNames.reduce(
            (config, project, index) => {
                config[project] = {
                    label: project,
                    color_light: ['#FFB3BA', '#BFFCC6', '#FFDFBA'][index],
                    color_dark: ['#FF6F61', '#7BC47F', '#FFAA85'][index],
                };
                return config;
            },
            {}
        );

        setChartConfig(chartConfiguration);
    }, [dataViewMode]);

    // This code simply used to simulate a loading spinner
    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinning(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [spinning]);

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        Recent Activities
                        <Button
                            variant="ghost"
                            className="ml-auto"
                            onClick={() => {
                                setSpinning(true);
                            }}
                        >
                            <RefreshCcw
                                className={`ml-auto h-4 w-4 ${spinning ? 'animate-spin' : ''}`}
                            />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        Your top 3 projects that have the most activities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        className="h-72 w-full"
                        config={chartConfig}
                    >
                        {chartKeys.length === 0 ? (
                            <div className="flex h-full items-center justify-center text-base text-muted-foreground">
                                {
                                    'Seems like there is no recent activity data available.'
                                }
                            </div>
                        ) : (
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={value => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />

                                {chartKeys.length === 0 && (
                                    <text
                                        x={50}
                                        y={50}
                                        textAnchor="middle"
                                        fill="currentColor"
                                    >
                                        No data available. Please select a
                                        different view mode.
                                    </text>
                                )}

                                {chartKeys.length > 0 &&
                                    chartKeys.map((key, index) => (
                                        <Area
                                            key={index}
                                            dataKey={key}
                                            type="natural"
                                            fill={
                                                currentTheme === 'light'
                                                    ? chartConfig[key]
                                                          .color_light
                                                    : chartConfig[key]
                                                          .color_dark
                                            }
                                            fillOpacity={0.1}
                                            stroke={
                                                currentTheme === 'light'
                                                    ? chartConfig[key]
                                                          .color_light
                                                    : chartConfig[key]
                                                          .color_dark
                                            }
                                            stackId="a"
                                        />
                                    ))}
                            </AreaChart>
                        )}
                    </ChartContainer>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 leading-none text-muted-foreground">
                                January - Dec 2024
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Chart;
