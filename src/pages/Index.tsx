
// ==========================================
// 🏠 WEEK 1: Index.tsx - Homepage Component
// ==========================================
// This is your main homepage! You will customize this in Week 1
// and add interactive components starting in Week 2.

// 📦 React imports - the core tools for building components
import { useState } from 'react';

// 🎨 Icon imports - beautiful icons for your UI
import { Upload, FileText, BarChart3, PieChart, TrendingUp, Brain, Zap, Database } from 'lucide-react';

// 🧩 UI Component imports - pre-built components for your interface
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 📊 Data-related imports - components that handle your data
import DataUpload from '@/components/DataUpload';
import Dashboard from '@/components/Dashboard';
import { DataRow } from '@/types/data';
// 🆕 WEEK 3: Import NameInput demo
// import NameInput from '@/components/NameInput';

// 🔧 WEEK 2: Import your UploadProgressSimulator component here
import UploadProgressSimulator from '@/components/UploadProgressSimulator';
import Week3_Updates from '@/components/My_NameInput';
//import { Upload, FileText, BarChart3, Brain, Zap, Database } from "lucide-react";
//^^^^was having an error pop up once I added the line above

// 🔧 WEEK 3+: Additional imports will be added as you progress
import DataAnalyzer from '@/components/DataAnalyzer';

//Week 5: Importing week 5 page
import {useNavigate} from 'react-router-dom'; 



const Index = () => {
  // 🧠 Component State - this is your component's memory!
  // useState lets your component remember and change data
  const [data, setData] = useState<DataRow[]>([]);      // Stores uploaded data
  const [fileName, setFileName] = useState<string>(''); // Remembers file name

  // 🔄 Event Handler - function that runs when data is uploaded
  const handleDataLoad = (loadedData: DataRow[], name: string) => {
    setData(loadedData);
    setFileName(name);
    console.log('Data loaded:', loadedData.length, 'rows');
  };
  const navigate = useNavigate(); // For navigation to Week 5 Page


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 🎨 Hero Section - The top part of your homepage */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          {/* 🎯 Logo and Title */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <Database className="h-12 w-12 text-white" />
            </div>
          </div>
          
          {/* 📝 WEEK 1: Students customize this title with their name */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            Plug-N-Learn: Kayla's Dashboard
          </h1>
          <p className="text-xl text-slate-600 mb-2">Data Insight Engine</p>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload your dataset and instantly discover insights, visualize trends, and explore your data with interactive charts and analytics.
          </p>
          <p className="text-sm text-slate-400 mt-2">
            Built with React, TypeScript, and Tailwind CSS. First time, let's do this!!!!!
          </p>
          <div className = "mt-6 flex justify-center">
            <Button onClick = {() => navigate('/week5-live')}>Open Week 5</Button> 
          </div>
        </div>
        {/* 🆕 WEEK 3: Live Event Handling Demo (removed NameInput from homepage) */}

        {/* 🔧 WEEK 2: ADD YOUR PROGRESS COMPONENT HERE! */}
        <Card className="bg-white/50 backdrop-blur-sm border-purple-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-3 h-6 w-6 text-purple-600" />
              Week 4 Updates
            </CardTitle>
            <CardDescription>
              Building a React component that analyzes a data set and displays key statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataAnalyzer />
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-3 h-6 w-6 text-purple-600" />
              Week 2 Updates
            </CardTitle>
            <CardDescription>
            Try our upload progress simulator built with React state!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadProgressSimulator />
            <Week3_Updates />
          </CardContent>
        </Card>



        {data.length === 0 ? (
          <>
            {/* 🎨 Features Grid - Shows what your app can do */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* 📤 Upload Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Easy Data Upload</CardTitle>
                  <CardDescription>
                    Simply drag and drop your CSV files or click to browse. Support for various data formats.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 📊 Charts Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Interactive Charts</CardTitle>
                  <CardDescription>
                    Automatically generate bar charts, line graphs, pie charts, and more from your data.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* 🧠 Insights Feature Card */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-xl">Smart Insights</CardTitle>
                  <CardDescription>
                    Discover patterns, trends, and statistical insights automatically generated from your dataset.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* 📤 Upload Section - Where users upload their data */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Get Started</CardTitle>
                <CardDescription>
                  Upload your CSV file to begin exploring your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataUpload onDataLoad={handleDataLoad} />
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Dashboard data={data} fileName={fileName} onReset={() => {
              setData([]);
              setFileName('');
            }} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
