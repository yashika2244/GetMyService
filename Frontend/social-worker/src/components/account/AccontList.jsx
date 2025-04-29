import React from "react";
import healthCare from "../../assets/healthCare.jpeg";
import foodDel from "../../assets/foodDel.jpeg";
import homeCare from "../../assets/homeCare.jpeg";
import petFood from "../../assets/petFood.jpeg";
import grocery from "../../assets/grocery.webp";
import repair from "../../assets/repair.webp";
import emagencyCare from "../../assets/emagencyCare.jpeg";
import events from "../../assets/events.jpg";
import { useNavigate } from "react-router-dom";

function AccontList() {
  const accounts = [
    { id: 1, title: "Health Care", photo: healthCare, loc:"At Mount Adora Hospital, Sylhet", peragraph:"Health care promotes well-being through prevention, treatment, and support.",   buttonText: "Message",},
    { id: 2, title: "Food & Delivery", photo: foodDel, loc:"Lettuce Eat Bistro",peragraph:"Enjoy fresh, hot meals delivered exactly as requested."},
    { id: 3, title: "Home Care", photo: homeCare, loc:"Serenity in Home Care", peragraph:"Home care offers personalized services in the comfort of home." },
    { id: 4, title: "Pet Food Delivery", photo: petFood , loc:"San Francisco Bay Area", peragraph:"Pet food delivery ensures your furry friend never runs out."},
    { id: 5, title: "Grocery Order", photo: grocery, loc:"Los Angeles" , peragraph:"Order groceries online and get them delivered to your door."},
    { id: 6, title: "Emergency Care", photo: emagencyCare , loc:"Central City Emergency", peragraph:"Accessible 24/7, offering expert care for accidents and illnesses."},
    { id: 7, title: "Repair & Installation", photo: repair, loc:"Yamaha Service Center" , peragraph:"Repair and installation services ensure the smooth functioning of appliances."},
    { id: 8, title: "Creative & Events", photo: events , loc:"JS Event Management", peragraph:"Creative and event services bring your vision to life."},
    // {id:9, buttonText: "Message",}

  ];

  const navigate = useNavigate();

  return (
    <section className="mt-4  ">
      <div className="flex flex-col gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="flex items-center gap-4">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm"
             
            >
              <img
                src={account.photo}
                alt={account.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h2
              className="text-base font-medium cursor-pointer"
              onClick={() => navigate("/chat",  { state: { title: account.title, photo: account.photo ,id:account.id,loc:account.loc, peragraph:account.peragraph,accounts: accounts} })}
            >
              {account.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AccontList;
