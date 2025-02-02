import React, { useState, useEffect } from "react";
import Styles from "../Styles/OrganizationSetup.module.css";

const OrganizationSetup = ({ onNext, setUserData }) => {
  const [orgData, setOrgData] = useState({
    companyName: "",
    website: "",
    description: "",
  });

  const [scrapedPages, setScrapedPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  // Here is a demo data of scraped web pages using meta data
  useEffect(() => {
    setScrapedPages([
      {
        url: "/home",
        status: "completed",
        chunks: [
          "About us content...",
          "Service details...",
          "Company mission...",
        ],
      },
      {
        url: "/products",
        status: "pending",
        chunks: [],
      },
      {
        url: "/contact",
        status: "completed",
        chunks: ["Contact information...", "Office locations..."],
      },
    ]);
  }, []);

  const fetchMetaDescription = async () => {
    if (!orgData.website) return;

    setIsLoading(true);
    try {
      //Here I will simulated API call to fetch meta description
      const response = await fetch(
        `/api/meta-description?url=${encodeURIComponent(orgData.website)}`
      );
      const data = await response.json();
      setOrgData((prev) => ({
        ...prev,
        description: data.description,
      }));
    } catch (error) {
      console.error("Failed to fetch meta description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      organization: {
        ...orgData,
        scrapedPages,
      },
    }));
    onNext();
  };

  const togglePageDetails = (pageUrl) => {
    setSelectedPage(selectedPage === pageUrl ? null : pageUrl);
  };

  return (
    <div className={Styles["organization-setup"]}>
      <h2 className={Styles["organization-title"]}>Setup Your Organization</h2>
      <form onSubmit={handleSubmit}>
        <div className={Styles["form-group"]}>
          <input
            type="text"
            placeholder="Company Name"
            value={orgData.companyName}
            onChange={(e) =>
              setOrgData({ ...orgData, companyName: e.target.value })
            }
            required
            className={Styles["form-input"]}
          />
        </div>

        <div className={`${Styles["form-group"]} ${Styles["website-input"]}`}>
          <input
            type="url"
            placeholder="Website URL"
            value={orgData.website}
            onChange={(e) =>
              setOrgData({ ...orgData, website: e.target.value })
            }
            required
            className={Styles["form-input"]}
          />
          <button
            type="button"
            onClick={fetchMetaDescription}
            disabled={isLoading}
            className={Styles["fetch-button"]}
          >
            {isLoading ? "Fetching..." : "Fetch Description"}
          </button>
        </div>

        <div className={Styles["form-group"]}>
          <textarea
            placeholder="Company Description"
            value={orgData.description}
            onChange={(e) =>
              setOrgData({ ...orgData, description: e.target.value })
            }
            required
            className={Styles["form-textarea"]}
          />
        </div>

        <div className={Styles["scraped-pages"]}>
          <h3>Website Pages</h3>
          <div className={Styles["pages-list"]}>
            {scrapedPages.map((page) => (
              <div key={page.url} className={Styles["page-item"]}>
                <div
                  className={Styles["page-header"]}
                  onClick={() => togglePageDetails(page.url)}
                >
                  <span className={Styles["page-url"]}>{page.url}</span>{" "}
                  <span
                    className={`${Styles["status-badge"]} ${
                      Styles[page.status]
                    }`}
                  >
                    {page.status}
                  </span>
                </div>
                {selectedPage === page.url && page.chunks.length > 0 && (
                  <div className={Styles["page-chunks"]}>
                    {page.chunks.map((chunk, index) => (
                      <div key={index} className={Styles.chunk}>
                        {chunk}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={Styles["submit-button"]}>
          Continue to Integration
        </button>
      </form>
    </div>
  );
};

export default OrganizationSetup;
