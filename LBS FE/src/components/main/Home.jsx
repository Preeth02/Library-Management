import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function Home() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      {/* Search Bar */}
      <div className="flex justify-between items-center bg-gray-800 rounded-lg px-4 py-2 mb-6 ">
        <Input placeholder="search" className="bg-gray-800 outline-none border-gray-500" />
        <Button></Button>
      </div>
      {/* Featured Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-2">Frank Miller</h3>
        <p className="text-3xl font-bold mb-4">Batman: The Dark Knight</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
          Read Now
        </button>
      </div>

      {/* Continue Reading & Top Rated Comics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Continue Reading */}
        <div>
          <h3 className="text-lg font-bold mb-4">Continue Reading</h3>
          <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-gray-600 w-20 h-20 rounded-lg"></div>
            <div>
              <h4 className="font-bold text-lg">Kobra Kai: Ultimate</h4>
              <div className="w-full bg-gray-600 h-2 rounded-full mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "39%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Rated Comics */}
        <div>
          <h3 className="text-lg font-bold mb-4">Top Rated Comics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Comic Cards */}
            {[
              { title: "The Flash, Vol 1", author: "Joshua Williamson" },
              { title: "Titans, Vol 2", author: "Andrew Robinson" },
              { title: "Harley Quinn, Vol 1", author: "Jimmy Palmiotti" },
              { title: "Suicide Squad #8", author: "Tom Taylor" },
            ].map((comic, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
              >
                <div className="bg-gray-600 w-20 h-20 rounded-lg mb-4"></div>
                <h4 className="font-bold text-center">{comic.title}</h4>
                <p className="text-sm text-gray-400">{comic.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
