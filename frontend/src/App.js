/* global chrome */
//import requests;
import ReactTable from "react-table-6";  
import 'react-table-6/react-table.css';
import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

export const App = () => {
  const [url, setUrl] = useState('');
  const [table, setTable] = useState([]);

  //var tbl = [{name: "test", title: "test2", link: "test3adkadjlskdaskld"}];
  //var columns = [{Header: "Classifier", accessor: 'name'}, {Header: "Title", accessor: 'title'}, {Header: "URL", accessor: 'link'}]
  //var columns = [{Header: "Title", accessor: 'title', width: 200, style: { 'whiteSpace': 'unset' }, Cell: ({ row }) => <a href={row.link}>{row.title}</a>}, {Header: "URL", accessor: 'link', width: 550, style: { 'whiteSpace': 'unset' }}]
  var columns = [{Header: "Title", accessor: 'title', width: 200, style: { 'whiteSpace': 'unset' }}, {Header: "URL", accessor: 'link', width: 550, style: { 'whiteSpace': 'unset' }}]
  //var columns = [{Header: "Title", accessor: 'title', width: 350, style: { 'whiteSpace': 'unset' }, Cell: ({ row }) => <a href={row.link}>{row.title}</a>}];
  //get chrome tab url
  useEffect(() => {
      const queryInfo = {active: true, lastFocusedWindow: true};

      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const url = tabs[0].url;
          setUrl(url);
      });
  }, []);

  //make fetch call
  function getResult() {
    
    return fetch('http://127.0.0.1:5000/backend/classifier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({url})
      }).then(res=>res.json()).then(data=>{


        var tbl = [];
        console.log(data);
        var tmp = "";
        for (var key in data) {
            console.log(key);
            tmp += key + "\n";
            var newVal= {title: "", link: ""};
            tbl.push(newVal);
            newVal= {title: key, link: ""};
            tbl.push(newVal);
            //console.log(data[key]);
            for (var articles in data[key]) {
                console.log(data[key][articles]["title"]);
                console.log(data[key][articles]["link"]);
                tmp += data[key][articles]["title"] + "\n" + data[key][articles]["link"] + "\n";
                //var newVal= {name: key, title: data[key][articles]["title"], link: data[key][articles]["link"]}
                newVal= {title: data[key][articles]["title"], link: data[key][articles]["link"]};
                tbl.push(newVal);
            }
            tmp += "\n";
            console.log(" ");
        }
        console.log(tmp);
        setTable(tbl);
        //setResult(tmp);
        })
  }
  

  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <button onClick={getResult}>Get Result</button>
            <ReactTable
            data = {table}
            columns = {columns}
            />

        </header>
    </div>
);
};
export default App;