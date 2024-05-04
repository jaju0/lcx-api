import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

/**
 * All supported kline timeframes
 */
export type KlineTimeframe = "1" | "3" | "5" | "15" | "30" | "45" | "60" | "120" | "180" | "240" | "1D" | "1W" | "1M";

/**
 * Order Side
 */
export type OrderSide = "BUY" | "SELL";

/**
 * Quantity of the base asset
 */
export type BaseQty = number;

/**
 * Asset Price
 */
export type Price = number;

/**
 * Side of the filled opposing limit order.
 */
export type MakerSide = OrderSide;

/**
 * Unix timestamp in milliseconds
 */
export type TimestampMs = number;

/**
 * datetime format
 * @example "2021-04-10T16:31:46.863+05:30"
 */
export type DateTime = string;

/**
 * Trade
 */
export type Trade = [BaseQty, Price, MakerSide, TimestampMs];

/**
 * Kline
 */
export interface Kline
{
    close: number;
    high: number;
    low: number;
    open: number;
    pair: string;
    timeframe: KlineTimeframe;
    timestamp: number;
    volume: number;
}

/**
 * Pair Precision
 */
export interface PairPrecision
{
    Amount: number;
    Price: number;
    Total: number;
}

/**
 * Pair Order Limits
 */
export interface PairOrderLimit
{
    Base: number;
    Quote: number;
}

/**
 * Pair
 */
export interface Pair
{
    Id: string;
    Symbol: string;
    Base: string;
    Quote: string;
    Precision: PairPrecision;
    Orderprecision: PairPrecision;
    MinOrder: PairOrderLimit;
    MaxOrder: PairOrderLimit;
    Status: boolean;
    CreatedAt: DateTime;
    UpdatedAt: DateTime;
    ListingPrice: number;
    Mode: string;
}

/**
 * Ticker Chart Point
 */
export interface TickerChartPoint
{
    Time: number;
    Close: number;
}

/**
 * Ticker Chart
 */
export type TickerChart = TickerChartPoint[];

/**
 * Ticker
 */
export interface Ticker
{
    bestAsk: number;
    bestBid: number;
    change: number;
    chart: TickerChart;
    equivalent: number;
    high: number;
    last24Price: number;
    lastPrice: number;
    lastUpdated: number;
    low: number;
    symbol: string;
    usdVolume: number;
    volume: number;
}


/**
 * Request parameters of the public endpoint "/api/book"
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1book/get
 */
export interface OrderbookRequestParams
{
    /**
     * Name of the pair
     * @example pair: "LCX/ETH"
     */
    pair: string;
}

/**
 * Request parameters of the public endpoint "/v1/market/kline"
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1v1~1market~1kline/get
 */
export interface KlineRequestParams
{
    /** Name of the pair */
    pair: string;
    /** Timeframe */
    resolution: KlineTimeframe;
    /** From time in UTC timestamp in seconds */
    from: number;
    /** To time in UTC timestamp in seconds */
    to: number;
}

/**
 * Request parameters of the public endpoint "/api/trades"
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1trades/get
 */
export interface TradeRequestParams
{
    /** Name of the pair @example pair: "LCX/USDC" */
    pair: string;
    /** Page index, first page = 1, fixed page size = 100 @example offset: 1 */
    offset: number;
}

/**
 * Request parameters of the public endpoint "/api/pair"
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1pair/get
 */
export interface PairRequestParams
{
    /** Name of the pair @example pair: "LCX/USDC" */
    pair: string;
}

export interface TickerRequestParams
{
    /** Name of the pair @example pair: "LCX/USDC" */
    pair: string;
}

/**
 * @interface ApiResponse
 * @template DataType type of the data field
 */
export interface ApiResponse<DataType>
{
    /** Request specific data */
    data: DataType;
    /** length of array data if data is an array */
    count?: number;
    /** response message */
    message: string;
    /** response status */
    status: string;
}

/**
 * Orderbook endpoint response data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1book/get
 */
export interface OrderbookData
{
    /** array of bids */
    buy: [number, number][];
    /** array of asks */
    sell: [number, number][];
}

/**
 * Kline endpoint response data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1v1~1market~1kline/get
 */
export type KlineData = Kline[];

/**
 * Trade endpoint data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1trades/get
 */
export type TradeData = Trade[];

/**
 * Pairs endpoint data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1pairs/get
 */
export type PairsData = Pair[];

/**
 * Pair endpoint data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1pair/get
 */
export type PairData = Pair;

/**
 * tickers endpoint data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1tickers/get
 */
export type TickersData = Record<string, Ticker>;

/**
 * ticker endpoint data
 * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1ticker/get
 */
export type TickerData = Ticker;


/**
 * @interface PublicRestClientConfig
 */
export interface PublicRestClientConfig
{
    /** Api base URL. Uses "https://exchange-api.lcx.com/" if not provided. */
    baseUrl?: string;
    /** Kline Api URL. Uses "https://api-kline.lcx.com" if not provided. */
    klineUrl?: string;
}

/**
 * Rest client for public endpoints
 * 
 * @class PublicRestClient
 */
export class PublicRestClient
{
    private config: PublicRestClientConfig;
    private axiosInstance: AxiosInstance;

    private baseUrl: string;
    private klineUrl: string;

    /**
     * @param {CreateAxiosDefaults} axiosConfig axios config parameters
     */
    constructor(config?: PublicRestClientConfig, axiosConfig?: CreateAxiosDefaults)
    {
        const defaultConfig = {
            baseUrl: "https://exchange-api.lcx.com/",
            klineUrl: "https://api-kline.lcx.com/",
        };

        this.config = config ?? defaultConfig;
        this.axiosInstance = axios.create(axiosConfig);

        this.baseUrl = this.config.baseUrl ?? defaultConfig.baseUrl;
        this.klineUrl = this.config.klineUrl ?? defaultConfig.klineUrl;
    }

    private async getWithBaseUrl<ResponseDataType>(path: string, params?: any)
    {
        const axiosResponse = await this.axiosInstance.get<ApiResponse<ResponseDataType>>(path, {
            method: "get",
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "application/json",
            },
            params,
        });

        if(axiosResponse.status === 200)
            return axiosResponse.data;

        throw axiosResponse;
    }

    private async getWithKlineUrl<ResponseDataType>(path: string, params?: any)
    {
        const axiosResponse = await this.axiosInstance.get<ApiResponse<ResponseDataType>>(path, {
            method: "get",
            baseURL: this.klineUrl,
            headers: {
                "Content-Type": "application/json",
            },
            params,
        });

        if(axiosResponse.status === 200)
            return axiosResponse.data;

        throw axiosResponse;
    }

    /**
     * This endpoint returns the complete order book for a specified market.
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1book/get
     * @param {OrderbookRequestParams} params request params
     * @returns {ApiResponse<OrderbookData>} api response with orderbook data
     */
    public async getOrderbook(params: OrderbookRequestParams)
    {
        return this.getWithBaseUrl<OrderbookData>("/api/book", params);
    }

    /**
     * This endpoint provides OHLV (Open, High, Low, Close, and Volume) data for the specified market.
     * It displays candles for the given market within a specified timeframe, from a starting timestamp to an ending timestamp (both in seconds).
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1v1~1market~1kline/get
     * @param {KlineRequestParams} params request params
     * @returns {ApiResponse<KlineData>} api response with kline data
     */
    public async getKline(params: KlineRequestParams)
    {
        return this.getWithKlineUrl<KlineData>("/v1/market/kline", params);
    }

    /**
     * This endpoint enables retrieval of past public trades, providing details such as price, size, and time for each trade.
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1trades/get
     * @param {TradeRequestParams} params request params
     * @returns {ApiResponse<TradeData>} api response with trade data
     */
    public async getTrades(params: TradeRequestParams)
    {
        return this.getWithBaseUrl<TradeData>("/api/trades", params);
    }

    /**
     * This endpoint provides access to details of all trading pairs available on the exchange platform.
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1pairs/get
     * @returns {ApiResponse<PairsData>} api response with pairs data
     */
    public async getPairs()
    {
        return this.getWithBaseUrl<PairsData>("/api/pairs");
    }

    /**
     * This endpoint allows retrieval of details for a given trading pair available on the exchange platform.
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1pair/get
     * @param {PairRequestParams} params request params
     * @returns {ApiResponse<PairData>} api response with pair data
     */
    public async getPair(params: PairRequestParams)
    {
        return this.getWithBaseUrl<PairData>("/api/pair", params);
    }

    /**
     * This endpoint enables access to a comprehensive market overview, displaying current best bid and ask prices,the latest traded price, daily volume information, and details on the previous day’s price movement.
     * It efficiently retrieves multiple tickers with a single query, providing a holistic view of market data.
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1tickers/get
     * @returns {ApiResponse<TickersData>} api response with tickers data
     */
    public async getTickers()
    {
        return this.getWithBaseUrl<TickersData>("/api/tickers");
    }

    /**
     * This endpoint enables a comprehensive market overview for a specified pair, showcasing current best bid and ask prices, the latest traded price, daily volume details, and the previous day’s price movement.
     * 
     * @link https://docs.lcx.com/#tag/Market-API/paths/~1api~1ticker/get
     * @param {TickerRequestParams} params request params
     * @returns {ApiResponse<TickerData>} api response with ticker data
     */
    public async getTicker(params: TickerRequestParams)
    {
        return this.getWithBaseUrl<TickerData>("/api/ticker", params);
    }
}