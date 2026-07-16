import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaTimesCircle,FaCheckCircle } from "react-icons/fa";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import SearchIcon from "@mui/icons-material/Search";
import  icon from  "../images/icon.png";
import "./sherbimet.css";
import sherbimetData from "../sherbime.json";

export default function Sherbimet() {
  const [isMobile, setIsMobile] = useState(false);
  const [sherbimet, setSherbimet] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSherbimet(sherbimetData);

    const checkSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkSize();

    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  function countDocuments(text) {
    if (!text || typeof text !== "string") {
      return 0;
    }

    return text
      .split(/\s*\d+\./)
      .filter((doc) => doc.trim().length > 0).length;
  }

  const getDokumente = (text) => {
    if (!text) return [];

    return text
      .split(/\d+\./)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const isFast = (value) => {
    if (!value) return false;

    return value.toString().trim().toUpperCase() === "PO";
  };

  const filteredSherbimet = sherbimet.filter((item) => {
  const search = searchTerm.toLowerCase();

  return (
    item["Emri i Shërbimit"]?.toLowerCase().includes(search) 
   
  );
});

  return (
    <div className="page">
<div className="search-container">

  <div className="search-wrapper">

    <input
      type="text"
      placeholder="Kërko shërbimin..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="service-search"
    />

    <SearchIcon className="search-icon" />

  </div>

</div>


      {/* ================= DESKTOP ================= */}

      {!isMobile && (
        <div className="table-wrapper">

          <table className="services-table">

            <thead>

              <tr>

                <th>Nr.</th>

                <th>Emri i Shërbimit</th>

                <th>Tarifa</th>

                <th>Kodi</th>


                <th>
                  Afati
                </th>


                <th>
                  Kamatëvonesë
                
                 <span className="info-wrapper">
                  <InfoOutlinedIcon
                    className="info-icon"                 
                  />

                     <span className="info-tooltip">
                        Kamatëvonesa aplikohet 10% e tarifës për çdo ditë vonesë,
                        por jo më shumë se 300 000 lekë.
                      </span>
                      </span>


                </th>


                <th>
                  Fast
                      
                 <span className="info-wrapper">

                  <InfoOutlinedIcon
                    className="info-icon"
                   
                  />

                    <span className="info-tooltip">
                       Shërbim me procedurë të përshpejtuar brenda 24 orëve.
                      </span>
                      </span>

                </th>


                <th>
                  Dokumentacioni
                </th>


                <th>
                  Apliko

                   <span className="info-wrapper">
                      
                       <InfoOutlinedIcon
                    className="info-icon"
                    
                  />

                     <span className="info-tooltip">
                      Aplikoni nëpërmjet e-Albania
                      </span>
                      </span>

                </th>


              </tr>

            </thead>


            <tbody>

             {filteredSherbimet.map((item,index)=>(

                <tr key={index}>


                  <td>
                    {item["Nr."]}
                  </td>


                  <td className="service-name">
                    {item["Emri i Shërbimit"]}
                  </td>


                  <td>
                    {item["Tarifa"]}
                  </td>


                  <td>
                    <span className="code">
                      {item["Kodi"]}
                    </span>
                  </td>



                  <td>

                    <span className="cell-center">

                      

                      {item["Afati"]}

                    </span>

                  </td>



                  <td>

                    {
                      item[
                        "Kamatëvonesë (10% e tarifës/ditë vonesë, por jo më shumë se 300 000 lekë)"
                      ]
                      ?.toUpperCase() === "PO"

                      ?

                      <span className="badge yes">
                         <FaCheckCircle />
                      PO
                      </span>

                      :

                      <span className="badge no">
                         <FaTimesCircle />
                        JO
                      </span>
                    }

                  </td>



                  <td>

                    {
                      isFast(
                        item[
                          "FAST (Shërbime me procedurë të përshpejtuar - 24H)"
                        ]
                      )

                      ?

                      <span className="badge yes">

                         <FaCheckCircle />

                        24h

                      </span>

                      :

                      <span className="badge no">

                        <FaTimesCircle />

                        24h

                      </span>
                    }

                  </td>



                  <td>

                    <details className="docs">

                      <summary>

                        {countDocuments(
                          item["Dokumentacioni i nevojshëm"]
                        )}

                        {" "}dokumente


                            <ExpandCircleDownOutlinedIcon
                                sx={{
                                  color: "#3b3b3b",
                                  fontSize: "25px",
                                  marginLeft: "12px",
                                   transition: "transform 0.3s ease"
                                }}
                              />

                      </summary>


                      <ul>

                        {
                          getDokumente(
                            item["Dokumentacioni i nevojshëm"]
                          ).map((doc,i)=>(

                            <li key={i}>
                              {doc}
                            </li>

                          ))
                        }

                      </ul>


                    </details>


                  </td>



                  <td>

                    <a

                      href={item["Apliko"]}

                      target="_blank"

                      rel="noreferrer"

                      className="btn btn-apply"

                    >
                     
                    
                      Apliko

                        <img src={icon} alt="" className="ealbania-icon" />

                    </a>

                  </td>



                </tr>


              ))}


            </tbody>


          </table>


        </div>
      )}



      {/* ================= MOBILE ================= */}


   {isMobile && (

  <div className="mobile-container">

    <h2 className="page-title">
      SHËRBIMET
    </h2>


    <div className="mobile-cards">


      {sherbimet.map((item,index)=>(


        <div
          className="service-card"
          key={index}
        >

          <div className="card-header">

            <span className="code">
              <span>KODI: </span>
              {item["Kodi"]}
            </span>

          </div>


          <div className="card-header">

            <h3>
              {item["Emri i Shërbimit"]}
            </h3>

          </div>


          <div className="card-row">

            <span>Tarifa</span>

            <b>
              {item["Tarifa"]}
            </b>

          </div>



          <div className="card-row">

            <span>Afati</span>

            <b>
              {item["Afati"]}
            </b>

          </div>



          <div className="card-row">

            <span>Kamatëvonesë  

                     <span className="info-wrapper">
                  <InfoOutlinedIcon
                    className="info-icon"                 
                  />

                     <span className="info-tooltip">
                        Kamatëvonesa aplikohet 10% e tarifës për çdo ditë vonesë,
                        por jo më shumë se 300 000 lekë.
                      </span>
                      </span>

            </span>

            {
              item[
                "Kamatëvonesë (10% e tarifës/ditë vonesë, por jo më shumë se 300 000 lekë)"
              ]?.toUpperCase() === "PO"

              ?

              <span className="badge yes">
                <FaCheckCircle />
                &nbsp;PO
              </span>

              :

              <span className="badge no">
                <FaTimesCircle />
                &nbsp;JO
              </span>
            }

          </div>



          <div className="card-row">

            <span>
              Fast

                  <span className="info-wrapper">

                  <InfoOutlinedIcon
                    className="info-icon"
                   
                  />

                    <span className="info-tooltip">
                       Shërbim me procedurë të përshpejtuar brenda 24 orëve.
                      </span>
                      </span>
            </span>


            {
              isFast(
                item[
                  "FAST (Shërbime me procedurë të përshpejtuar - 24H)"
                ]
              )

              ?

              <span className="badge yes">

                  <FaCheckCircle />

                &nbsp;24h

              </span>

              :

              <span className="badge no">

                <FaTimesCircle />

                &nbsp;24h

              </span>
            }

          </div>




          <details className="documentation-details">

            <summary className="card-row">

              <span>
                Dokumentacioni
              </span>


              <div className="summary-right">

                <b>
                  {countDocuments(item["Dokumentacioni i nevojshëm"])} dokumente
                </b>


                <ExpandCircleDownOutlinedIcon
                  sx={{
                    color:"#3b3b3b",
                    fontSize:"22px",
                    marginLeft:"6px"
                  }}
                />

              </div>


            </summary>



            <ul className="documentation-list">

              {
                getDokumente(
                  item["Dokumentacioni i nevojshëm"]
                )
                .map((doc,i)=>(

                  <li key={i}>
                    {doc}
                  </li>

                ))
              }

            </ul>


          </details>




          <a

            href={item["Apliko"]}

            target="_blank"

            rel="noreferrer"

            className="btn btn-apply"

          >

            Apliko

            <img 
              src={icon} 
              alt="" 
              className="ealbania-icon" 
            />

          </a>


        </div>


      ))}


    </div>


  </div>

)}

    </div>
  );
}