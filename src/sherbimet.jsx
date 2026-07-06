import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaTimesCircle } from "react-icons/fa";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./sherbimet.css";

const sherbimet = [
  {
    id: 1,
    emri: "Regjistrimi i pronësisë",
    tarifa: "5,000",
    kodi: "ASHK_R2",
    afati: "3",
    fast: true,
    dokumente: [
      "Kërkesa",
      "Akt noterial",
      "Kartë identiteti",
      "Mandat pagese",
      "Certifikatë pronësie",
      "Dokument shtesë",
    ],
  },
  {
    id: 2,
    emri: "Ndryshim pronari",
    tarifa: "3,500",
    kodi: "ASHK_R5",
    afati: "5",
    fast: false,
    dokumente: ["Kërkesa", "Kontratë", "Kartë ID"],
  },
];

export default function Sherbimet() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">SHËRBIMET</h2>

      {/* ================= DESKTOP TABLE ================= */}
      {!isMobile && (
        <div className="table-wrapper">
          <table className="services-table">
            <thead>
              <tr>
                <th>Nr.</th>
                <th>Emri i Shërbimit</th>
                <th>Tarifa</th>
                <th>Kodi</th>
                <th>Dokumentacioni</th>
                <th>Afati</th>
                <th>Fast</th>
                <th>Apliko</th>
              </tr>
            </thead>

            <tbody>
              {sherbimet.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>

                  <td className="service-name">{item.emri}</td>

                  <td>{item.tarifa}</td>

                  <td>
                    <span className="code">{item.kodi}</span>
                  </td>

                  <td>
                    <details className="docs">
                      <summary>
                        📄 {item.dokumente.length} Dokumente
                        <span className="arrow">▼</span>
                      </summary>

                      <ul>
                        {item.dokumente.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </details>
                  </td>

                  <td>
                    <span className="cell-center">
                      <FaCalendarAlt style={{ color: "#3b82f6" }} />
                      {item.afati} ditë
                    </span>
                  </td>

                  <td>
                    {item.fast ? (
                      <span className="badge yes">
                        <FaClock /> 24h
                      </span>
                    ) : (
                      <span className="badge no">
                        <FaTimesCircle /> JO
                      </span>
                    )}
                  </td>

                  <td>
                    <button className="btn btn-apply">
                      <img src="/images/flag.png" alt="icon" />
                      APLIKO <ArrowForwardIcon fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= MOBILE CARDS ================= */}
      {isMobile && (
        <div className="mobile-cards">
          {sherbimet.map((item) => (
            <div className="service-card" key={item.id}>
              <div className="card-header">
                <h3>{item.emri}</h3>
                <span className="code">{item.kodi}</span>
              </div>

              <div className="card-row">
                <span>Tarifa</span>
                <b>{item.tarifa}</b>
              </div>

              <div className="card-row">
                <span>Afati</span>
                <b>
                  <FaCalendarAlt /> {item.afati || "-"} ditë
                </b>
              </div>

              <div className="card-row">
                <span>Fast</span>
                {item.fast ? (
                  <span className="badge yes">
                    <FaClock /> 24h
                  </span>
                ) : (
                  <span className="badge no">
                    <FaTimesCircle /> JO
                  </span>
                )}
              </div>

              <details className="docs">
                <summary>
                  📄 Dokumentet ({item.dokumente.length}){" "}
                  <span className="arrow">▼</span>
                </summary>

                <ul>
                  {item.dokumente.map((doc, i) => (
                    <li key={i}>{doc}</li>
                  ))}
                </ul>
              </details>

              <button className="btn btn-apply">
                APLIKO <ArrowForwardIcon fontSize="small" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}