import React from "react";
import { Card } from "react-bootstrap";
import { CONSTANTS } from "../../config";

/**
 * Card Component to display all coins
 */

const ListCard = ({
  logo,
  name,
  symbol,
  currentPrice,
  high24hPrice,
  low24hPrice,
  onClick,
}) => {
  return (
    <Card className="listCard mb-4" onClick={onClick}>
      <Card.Body>
        <span className="text-center logo">
          <img src={logo} alt="img-fluid" />
        </span>
        <div className="text-center mb-4">
          <h2 className="cryptoName">{name}</h2>
          <small className="cryptoSymbol">{symbol}</small>
        </div>
        <div className="text-center currentPrice mb-4">
          <h5 className="text-warning">{currentPrice}</h5>
          <strong>{CONSTANTS.CURRENT_PRICE}</strong>
        </div>
        <div className="d-flex justify-content-between align-items-center priceWrapper">
          <div className="high24Hr">
            <span className="text-success">{high24hPrice}</span>
            <label>{CONSTANTS.HIGH_PRICE}</label>
          </div>
          <div className="text-end low24Hr">
            <span className="text-danger">{low24hPrice}</span>
            <label>{CONSTANTS.LOW_PRICE}</label>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListCard;
