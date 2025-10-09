import {useState} from 'react'; 
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const DataAnalyzer = () => {
    const sampleData = [23, 45, 67, 89, 34, 56, 78, 90, 12, 45, 67, 89];
    const [analysis, setAnalysis] = useState(null);
    
    const analyzeData = () => {
    // Calculate statistics
    const validNumbers = sampleData.filter(num => typeof num === 'number' && !isNaN(num));
    if (validNumbers.length === 0) {
        setAnalysis({error: "No valid numbers to analyze"});
        return;
    }

    const sum = validNumbers.reduce((total, num) => total + num, 0);
    const average = sum / validNumbers.length;
    const maximum = Math.max(...validNumbers);
    const minimum = Math.min(...validNumbers);
    const count = validNumbers.length;

    setAnalysis({sum,average: average.toFixed(2),maximum,minimum,count});
    };

    return (
        <div> 
            <h2>Data Analyzer</h2>
            <div> 
                <button onClick = {analyzeData}>Analyze Data</button>
                {analysis && (
                    analysis.error ? (
                        <div style = {{color: 'red'}}>Error: {analysis.error}</div>
                    ) : (
                        <ul>
                            <li>Sum: {analysis.sum}</li>
                            <li>Average: {analysis.average}</li>
                            <li>Maximum: {analysis.maximum}</li>
                            <li>Minimum: {analysis.minimum}</li>
                            <li>Count: {analysis.count}</li>
                        </ul>
                    )
                )}
            </div> 
            
        </div> 
        


    ); 
};

export default DataAnalyzer;
