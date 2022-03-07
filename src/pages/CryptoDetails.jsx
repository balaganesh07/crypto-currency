import React from "react";
import { Row, Col } from "react-bootstrap";
import { CONSTANTS } from "../config";
import {loader} from '../common/loader'

/**
 * To show single coin detail
 */

const CryptoDetails = ({ coinInfo, loading }) => {

  // getting name from website
  const getUrlName = (name) => {
    const url = name?.split("//")[1].split(".");
    if (url[0] === "www") {
      return url[1];
    } else {
      return url[0];
    }
  };

  return (
    <>
    {loading ? loader() :
      <>
        <Row className="mb-4">
          <Col md={6}>
            <div className="infoWrapper d-flex align-items-center">
              <div className="infoLeft">
                <img src={coinInfo?.image?.thumb} alt="" />
              </div>
              <div className="infoRight">
                <h3>
                  {coinInfo?.name} <span>({coinInfo?.symbol})</span>
                </h3>
                <small>{coinInfo?.hashing_algorithm}</small>
              </div>
            </div>
          </Col>
          <Col md={6} className="text-end">
            <div className="marketCap">
              <label>{CONSTANTS.MARKET_CAP}</label>
              <span>{coinInfo?.market_data?.market_cap?.eur}</span>
            </div>
          </Col>
        </Row>
        <Col md={12} className="content mb-2">
          <h6 className="mb-3">{CONSTANTS.ABOUT} {coinInfo?.name}</h6>
          <p
            dangerouslySetInnerHTML={{ __html: coinInfo?.description?.en || CONSTANTS.UPDATE_SOON }}
          ></p>
        </Col>
        <Row>
          <Col xs={6} sm={6} md={6}>
            <div className="genesisSection">
              <label>{CONSTANTS.GENESIS_DATE}</label>
              <span>{coinInfo?.genesis_date || '--'}</span>
            </div>
          </Col>
          <Col xs={6} sm={6} md={6}>
            <div className="siteInfo text-end">
              <label>{CONSTANTS.WEBSITE}</label>
              <a
                href={coinInfo?.links?.homepage[0]}
                target="_blank"
                rel="noreferrer"
              >
                {getUrlName(coinInfo?.links?.homepage[0])}
              </a>
            </div>
          </Col>
          </Row>
      </>
    }
    </>
  );
};

export default CryptoDetails;
