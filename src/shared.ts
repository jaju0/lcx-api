/**
 * @interface ApiResponse
 * @template DataType type of the data field
 */
export interface ApiResponse<DataType>
{
    /** Request specific data */
    data?: DataType;
    /** length of array data if data is an array */
    count?: number;
    /** response message */
    message: string;
    /** response status */
    status: string;
    /** used for order counts on private endpoints */
    totalCount?: number;
}
