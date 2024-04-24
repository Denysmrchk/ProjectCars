"use client"
import '../globals.css';
import JobComponent from "@/components/JobComponent";

export default function Home() {
 const  data=[{
     title:"Pole", description:"Треба робити все що скажуть, любити землю і любити людей",
     timePerPoint:8, payoffValue: 20
 },
     {
         title:"Dvirnyk", description:"Обов'язки до працівника: ранок прокидатись, замітати вулицю, бути привітним",
         timePerPoint:40, payoffValue: 30
     },
     {
         title:"Delivery GUY", description:"Вимоги: мати посвідчення водія, знати місцевість і мати телефон",
         timePerPoint:30, payoffValue: 27
     },
     {
         title:"Beer Bar", description:"Розливай пиво і кайфуй разом з нами!",
         timePerPoint:6, payoffValue: 16
     },
     {
         title:"I`m Mechanic", description:"Шукаємо слюсара в СТО, від 2-х років досвіду",
         timePerPoint:19, payoffValue: 43,
     },
 ]
    return (
        <main className="min-h-fit">
            <div className="flex flex-col p-10">
                {data.map((item, index) => (
                    <JobComponent {...item} key={item.description} />
                ))}
            </div>
        </main>
    );
}
