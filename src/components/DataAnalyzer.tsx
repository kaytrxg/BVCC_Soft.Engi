import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const DataAnalyzer = () => {
    const sampleData = [23, 45, 67, 89, 34, "apple", 78, 90, 75, 45, 67, 89];
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");
    
    const analyzeData = () => {
    // Calculate statistics
    const validNumbers = sampleData.filter(num => typeof num === 'number' && !isNaN(num));
    if (validNumbers.length === 0) {
        setAnalysis({error: "No valid numbers to analyze"});
        return;
    }
    const sum = validNumbers.reduce((total, num) => total + num, 0);
    const count = validNumbers.length;
    const average = sum / count;
    const maximum = Math.max(...validNumbers);
    const minimum = Math.min(...validNumbers);
    
    setAnalysis({sum,average: average.toFixed(2),maximum,minimum,count});

    };

    // Reset the analysis result
    const handlereset = () => {
        setAnalysis(null);
    };

    const handleInputErrors = () => {
        //Handling errors within the array
        {/* Filter out non-numeric values
            Show an error if no valid numbers are found
            Handle empty arrays gracefully */}

        const invalid = sampleData
            .map((v, i) => ({ v, i }))
            .filter(item => typeof item.v !== 'number' || Number.isNaN(item.v));

        if (invalid.length > 0) {
            const indices = invalid.map(x => x.i).join(', ');
            const examples = invalid.slice(0, 3).map(x => `${x.i}: ${JSON.stringify(x.v)}`).join('; ');
            setError(`Non-numeric values at index(es) ${indices}. Examples: ${examples}`);
            return false;
        }
        // No errors
        setError("");
        return true
    };

    return (
        <div> 
            <h1>Data Analyzer</h1>
            <div> 
                <Button onClick={() => { handleInputErrors(); analyzeData(); }}>Analyze Data</Button>
                {error && (<p className="text-center text-red-600 text-sm">{error}</p>)}
                {analysis && (
                    analysis.error ? (
                        <div style = {{color: 'red'}}>Error: {analysis.error}</div>
                    ) : (
                        <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="font-medium text-muted-foreground">Sum</dt>
                            <dd>{analysis.sum}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Average</dt>
                            <dd>{analysis.average}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Maximum</dt>
                            <dd>{analysis.maximum}</dd>
                        </div>
                        <div>
                            <dt className="font-medium text-muted-foreground">Minimum</dt>
                            <dd>{analysis.minimum}</dd>
                        </div>
                        <div className="col-span-2">
                            <dt className="font-medium text-muted-foreground">Count</dt>
                            <dd>{analysis.count}</dd>
                        </div>
                        </dl>
                    )
                )}
                <Button onClick = {handlereset}>Reset</Button>
            </div> 
            
        </div> 
        


    ); 
};

export default DataAnalyzer;
