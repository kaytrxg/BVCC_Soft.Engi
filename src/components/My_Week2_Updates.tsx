import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';


const Week3_Updates = () => {

    const COLORS = ["#f87171", "#60a5fa", "#34d399"];
    const [count, setCount] = useState(0);
    const [bgColor, setBgColor] = useState("#fff");
    const [showMsg, setShowMsg] = useState(false);
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");

    const handleReset = () => {
        setCount(0);
        setBgColor("#fff");
        setShowMsg(false);
        setName("");
        setGreeting("");
    }

    const handling_NameSubmit = () => {
         setGreeting(`Hello, ${name.trim()}! Welcome to data analysis!`);
    }


    return (
    <div className="progress-container p-6 bg-white rounded-lg shadow-md max-w-md mx-auto" style = {{background: bgColor}}>
      {/* <h2 className="text-2xl font-bold text-center mb-6">Week 2 Progression</h2> */}
        <div className="space-y-4">
            {/* Counter row */}
            <div className="flex items-center justify-center gap-3">
                <Button onClick={() => setCount(c => c - 1)}>-</Button>
                <span className="text-lg font-medium">Count: {count}</span>
                <Button onClick={() => setCount(c => c + 1)}>+</Button>
                <Button onClick={() => setCount(0)}>Reset</Button>
            </div>
            {/* Color picker row (stacked below counter) */}
            <div className="flex flex-col items-center">
                <span> PICK A BACKGROUND COLOR </span>
                <div className="flex items-center gap-3">
                    {COLORS.map(color => (
                        <Button
                            key={color}
                            style={{ background: color, width: 32, height: 32, borderRadius: '50%' }}
                            onClick={() => {
                                setBgColor(color);
                            }}
                        />
                    ))}
                </div>
            </div>
            {/*Toggling Messages*/}
            <div className = "flex justify-center">
                <Button onClick = {() => setShowMsg(v => !v)}>
                    {showMsg ? "Hide?" : "Show Message"}
                </Button>
            </div>
            {showMsg && <p>Great Job! Now you can see the message, the message can toggle. </p>}
            {/* Name Input Section */}
            <div className="flex flex-col items-center">
                <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange = {(e) => setName(e.target.value)}
                />
                <Button onClick={handling_NameSubmit}> Enter Your Name :/ </Button>
                {greeting && <p className="text-green-600 font-medium">{greeting}</p>}
            </div>

            {/*Resets Everything*/}
            <Button onClick= {handleReset}> Reset All </Button>
        </div>
    </div>
    );
    };

export default Week3_Updates;



//Background color changing
