import React, { useEffect, useState } from 'react';
import axios from 'axios';
export const Form = () => {
    const [fromData,setFromdata]=useState({});
    const [Data,setData]=useState([]);
    const [page,setPage]=useState(1)
     
    useEffect(()=>{
        // axios.get(`http://localhost:3001/games?_page=${page}&_limit=1`)
        // .then(res=>{
        //     setData(res.data);
        // })
        getData();
    },[page])

    const getData=()=>{
        axios.get(`http://localhost:3001/games?_page=${page}&_limit=1`)
        .then(res=>{
            setData(res.data);
        })
    }
    const handelChange=(e)=>{
      let {name,value,checked,type}=e.target;
      value=type==="checkbox"?checked:value;
      setFromdata({
          ...fromData,
          [name]:value,
      })
    }

  return <div className='FromData'>
      <form  id="addgame" onSubmit={(e)=>{
          axios.post("http://localhost:3001/games",fromData)
          .then(res=>{
              console.log(res.data);
          })
      }}>
           <input onChange={handelChange} type="text" name="gamename" placeholder='Enter name' />
           <input onChange={handelChange} type="text" name="gameauthor" placeholder='Enter name' />
           <input onChange={handelChange} type="text" name="gametags" placeholder='Enter name' />
           <input onChange={handelChange} type="number" name="gameprice" placeholder='Enter name' />
           <input onChange={handelChange} type="checkbox" name="forkids" placeholder='Enter name' />
           <textarea onChange={handelChange} name="gamedesc" id="" cols="20" rows="3"></textarea>
          <select name="gamerating" onChange={handelChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
          </select>
          <input type="submit" value="submit" />
      </form>
      {
          Data.map((e)=>{
              return <div key={e.id}>
                  <table id='table'>
                      <thead>
                        <tr>
                            <th>gameName <button>sort</button></th>
                            <th>gameAuthor</th>
                            <th>gameTags</th>
                            <th>gamePrice<button id="sortbyprice">sort</button></th>
                            <th>isForKids</th>
                            <th>Rating<button>sort</button></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td className='gamename'>{e.gamename}</td>
                            <td>{e.gameauthor}</td>
                            <td>{e.gametags}</td>
                            <td>{e.gameprice}</td>
                            <td>{e.forkids?"T":"F"}</td>
                            <td>{e.gamerating}</td>
                        </tr>
                      </tbody>
                  </table>
              </div>
          })
      },
      <button onClick={()=>{
           setPage(page-1);
      }}>Prev</button>
      <button onClick={()=>{
          setPage(page+1);
      }}>Next</button>
  </div>;
};
