import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { apiServices } from "../services/axios";
import { CONSTANTS } from "../config";
import { toast } from "react-toastify";
import ArrowTop from "../images/arrow-top.svg";
import Drawer from "../reusable/Drawer";
import CryptoDetails from "./CryptoDetails";
import InfiniteScroll from "react-infinite-scroll-component";
import ListCard from "../reusable/Card";
import {loader} from '../common/loader'

/**
 * To show coins list in card and individual coins in slide drawer
 */

const ListPage = () => {
  const [coinList, setCoinList] = useState([]);
  const [coinInfo, setCoinInfo] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [scrollTop, setScrollTop] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(20);

  // To get all coins list
  const getCoinList = () => {
    setIsLoading(true);
    const params = "?vs_currency=eur&order=market_cap_desc";
    apiServices
      .get(CONSTANTS.COIN + CONSTANTS.DS + CONSTANTS.MARKETS + params)
      .then(
        (res) => {
          if (res) {
            setCoinList(res);
            setCoinData(res.slice(0, 10));
            setIsLoading(false);
          }
        },
        (error) => {
          if (Array.isArray(error)) {
            error = error[0].msg;
          }
          const resError = error ? error.toString() : "Server response error";
          toast.error(resError);
        }
      );
  };

  // To get single coin info
  const getSingleCoin = (id) => {
    setLoading(true);
    apiServices.get(CONSTANTS.COIN + CONSTANTS.DS + id).then(
      (resp) => {
        if (resp) {
          setCoinInfo(resp);
          setLoading(false);
        }
      },
      (error) => {
        if (Array.isArray(error)) {
          error = error[0].msg;
        }
        const respErr = error ? error.toString() : "No response from Server";
        toast.error(respErr);
      }
    );
  };

  // using infinite scroll, increase coin list by 10 and show in UI
  const getCoinData = () => {
    if (coinData && coinData.length < coinList.length) {
      setCoinData(coinList.slice(0, count));
      setCount(count + 10);
    } else {
      setHasMore(false);
    }
  };

  // scroll to top - icon appear if page offset is above 300
  useEffect(() => {
    getCoinList();
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);


  // moving to page top
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // show or hide drawer and calling single coin list api
  const toggleDrawer = (id) => {
    setShowDrawer(!showDrawer);
    if (id) {
      getSingleCoin(id);
    }
  };

  return (
    <>
      <Row>
        <Col className="mt-4">
          <h1 className="border-start border-4 border-warning ps-3 sectionTitle">
            {CONSTANTS.CRYPTO_LIST}
          </h1>
        </Col>
      </Row>
      {isLoading ? (
        loader()
      ) : (
        <InfiniteScroll
          dataLength={coinData && coinData.length}
          next={getCoinData}
          scrollThreshold={0.9}
          hasMore={hasMore}
          endMessage={
            <Row>
              <Col className="text-center text-secondary fw-bold mb-4">
                <span className="scrollEnd d-block py-2">
                    {CONSTANTS.NO_DATA}
                </span>
              </Col>
            </Row>
          }
          className="pt-3"
          style={{ overflow: "unset" }}
        >
          <Row>
            {coinData &&
              coinData.map((item, index) => (
                <Col sm={12} md={6} lg={4} key={index}>
                  <ListCard
                    logo={item?.image}
                    name={item?.name}
                    symbol={item?.symbol}
                    currentPrice={item?.current_price}
                    high24hPrice={item?.high_24h}
                    low24hPrice={item?.low_24h}
                    onClick={() => toggleDrawer(item?.id)}
                  />
                </Col>
              ))}
          </Row>
        </InfiniteScroll>
      )}

      {scrollTop && (
        <div className="backtoTop">
          <Button
            variant="warning"
            onClick={backToTop}
            className="rounded-circle d-flex align-items-center justify-content-center"
          >
            <img src={ArrowTop} alt="" />
          </Button>
        </div>
      )}
      <Drawer show={showDrawer} handleDrawer={toggleDrawer}>
        <CryptoDetails coinInfo={coinInfo} loading={loading} />
      </Drawer>
    </>
  );
};

export default ListPage;
