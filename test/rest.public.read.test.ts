import { describe, expect, it } from "vitest";
import { PublicRestClient } from "../src/PublicRestClient.js";

describe("Public Endpoints", () => {
    const restClient = new PublicRestClient();
    const testPair = "LCX/USDC";

    it("getOrderbook()", async () => {
        const response = await restClient.getOrderbook({
            pair: testPair,
        });

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });

    it("getKline()", async () => {
        const to = Math.floor(Date.now() / 1000);
        const response = await restClient.getKline({
            pair: testPair,
            resolution: "1",
            from: to-60*60,
            to,
        });

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });

    it("getTrades()", async () => {
        const response = await restClient.getTrades({
            pair: testPair,
            offset: 1,
        });

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });

    it("getPairs()", async () => {
        const response = await restClient.getPairs();

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });

    it("getPair()", async () => {
        const response = await restClient.getPair({
            pair: testPair,
        });

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });

    it("getTickers()", async () => {
        const response = await restClient.getTickers();

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });

    it("getTicker()", async () => {
        const response = await restClient.getTicker({
            pair: testPair,
        });

        expect(response).toBeDefined();
        expect(response.status).toBe("success");
        expect(response.data).toBeDefined();
    });
});