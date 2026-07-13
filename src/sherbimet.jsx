import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaTimesCircle } from "react-icons/fa";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./sherbimet.css";
import sherbimetData from "../sherbime.json";


export default function Sherbimet() {

  const [isMobile, setIsMobile] = useState(false);
  const [sherbimet, setSherbimet] = useState([]);


  useEffect(() => {

    // Merr të dhënat nga JSON
    setSherbimet(sherbimetData);


    const checkSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };


    checkSize();

    window.addEventListener(
      "resize",
      checkSize
    );


    return () => {
      window.removeEventListener(
        "resize",
        checkSize
      );
    };


  }, []);


function countDocuments(text) {
  if (!text || typeof text !== "string") {
    return 0;
  }

  return text
    .split(/\s*\d+\./)
    .filter(doc => doc.trim().length > 0)
    .length;
}



  // Ndaj dokumentet nga teksti i Excel
  const getDokumente = (text) => {

    if (!text) return [];

    return text
      .split(/\d+\./)
      .map(item => item.trim())
      .filter(item => item.length > 0);

  };



  // Kontrollo FAST nga Excel
  const isFast = (value) => {

    if (!value) return false;

    return value.toString()
      .trim()
      .toUpperCase() === "PO";

  };



  return (

    <div className="page">


      <h2 className="page-title">
        SHËRBIMET
      </h2>




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

                <th>Afati</th>

                <th>Kamatëvonesë</th>

                <th>Fast</th>
                
                <th>Dokumentacioni</th>

                <th>Apliko</th>


              </tr>


            </thead>




            <tbody>


            {sherbimet.map((item,index)=>(


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


                    <FaCalendarAlt/>


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
                        PO
                      </span>

                      :

                      <span className="badge no">
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

                (

                  <span className="badge yes">

                    <FaClock/>
                    24H

                  </span>


                )


                :


                (

                  <span className="badge no">

                    <FaTimesCircle/>
                    JO

                  </span>


                )


                }


                </td>

              
                              <td>


                  <details className="docs">


                  <summary>
                  ({countDocuments(item["Dokumentacioni i nevojshëm"])}) Dokumente 

                    <span className="arrow">
                      ▼
                    </span>
                  </summary>



                    <ul>


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


                </td>





                <td>


                  <a

                    href={item["Apliko"]}

                    target="_blank"

                    rel="noreferrer"

                    className="btn btn-apply"

                  >


                    APLIKO

                    <ChevronRightIcon fontSize="small"/>


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


        <div className="mobile-cards">



        {

        sherbimet.map((item,index)=>(


          <div

            className="service-card"

            key={index}

          >




            <div className="card-header">


              <h3>

                {item["Emri i Shërbimit"]}

              </h3>



              <span className="code">

                {item["Kodi"]}

              </span>


            </div>







            <div className="card-row">


              <span>
                Tarifa
              </span>


              <b>

                {item["Tarifa"]}

              </b>



            </div>






            <div className="card-row">


              <span>
                Afati
              </span>


              <b>

                <FaCalendarAlt/>

                {item["Afati"]}


              </b>


            </div>






            <div className="card-row">


              <span>
                Fast
              </span>



              {

              isFast(

                item[
                "FAST (Shërbime me procedurë të përshpejtuar - 24H)"
                ]

              )

              ?

              <span className="badge yes">

                <FaClock/>
                24H

              </span>


              :

              <span className="badge no">

                <FaTimesCircle/>
                JO

              </span>


              }



            </div>







            <details className="docs">


              <summary>

                📄 Dokumentet

                <span className="arrow">
                  ▼
                </span>


              </summary>




              <ul>


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

              APLIKO


           <ChevronRightIcon fontSize="small"/>


            </a>




          </div>



        ))


        }



        </div>



      )}




    </div>

  );


}