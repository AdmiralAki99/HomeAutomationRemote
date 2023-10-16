import React ,{useState, useEffect} from 'react';
import logo from './logo.svg';
import { Button } from "./@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,} from './@/components/ui/card'

function App() {
  const [selected,setSelected] = React.useState(0);
  return (
    <div className="pl-4 pr-4 pt-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-4 ">
          <Card className="w-[300px] h-[100px]">
            <div className='mx-auto grid grid-cols-3 lg:col-span-2 '>
              <div className='bg-red-500 max-w-7xl'>
                <Button><ChevronRightIcon className="h-4 w-4" /></Button>
              </div>
            </div>
          </Card>
          <Card className="w-[300px] h-[100px]"></Card>
          <Card className="w-[300px] h-[100px]"></Card>
        </div>
      </div>
    </div>
  );
}

export default App;
