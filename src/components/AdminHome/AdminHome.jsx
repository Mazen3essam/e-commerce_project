import React from "react";
import style from "./AdminHome.module.css"

export default function AdminHome(){
    return <>
        

<div>
  <div className="flex flex-col bg-white text-black ">
    <div className="mx-10 pt-14">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <div className="bg-amber-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-amber-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
            <i className="fa-solid fa-user-group text-amber-600 text-2xl"></i>
          </div>
          <div className="text-right">
            <p className="text-2xl">1,257</p>
            <p>Visitors</p>
          </div>
        </div>
        <div className="bg-amber-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-amber-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
            <i className="fa-solid fa-bag-shopping text-amber-600 text-2xl"></i>
          </div>
          <div className="text-right">
            <p className="text-2xl">557</p>
            <p>Orders</p>
          </div>
        </div>
        <div className="bg-amber-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-amber-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
            <i className="fa-solid fa-arrow-trend-up  text-amber-600 text-2xl"></i>
          </div>
          <div className="text-right">
            <p className="text-2xl">$11,257</p>
            <p>Sales</p>
          </div>
        </div>
        <div className="bg-amber-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-amber-600 text-white font-medium group">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full">
            <i className="fa-solid fa-coins  text-amber-600 text-2xl"></i>
          </div>
          <div className="text-right">
            <p className="text-2xl">$75,257</p>
            <p>Balances</p>
          </div>
        </div>
      </div>
      {/* ./Statistics Cards */}
      <div className="grid grid-cols-1 p-4">
        {/* Social Traffic */}
        <div className="relative flex flex-col min-w-0 bg-gray-50 w-full shadow-lg rounded">
          <div className="rounded-t mb-0 px-0 border-0">
            <div className="flex flex-wrap items-center px-4 py-2">
              <div className="relative w-full max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">Social Traffic</h3>
              </div>
              <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <button className="bg-amber-500 text-white text-xs font-bold uppercase px-3 py-1 rounded outline-none mr-1 mb-1">See all</button>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Referral</th>
                    <th className="px-4 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Visitors</th>
                    <th className="px-4 bg-gray-100 text-gray-500 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px" />
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-gray-700">
                    <th className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">Facebook</th>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">5,480</td>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">70%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div style={{width: '70%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <th className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">Twitter</th>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">3,380</td>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">40%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                            <div style={{width: '40%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <th className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">Instagram</th>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">4,105</td>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">45%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div style={{width: '45%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-600" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <th className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">Google</th>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">4,985</td>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">60%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div style={{width: '60%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-gray-700">
                    <th className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">Linkedin</th>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4 text-left">2,250</td>
                    <td className="px-4 align-middle text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="mr-2">30%</span>
                        <div className="relative w-full">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-amber-200">
                            <div style={{width: '30%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* ./Social Traffic */}
      </div>
    </div>
  </div>
</div>
   



    </>
}