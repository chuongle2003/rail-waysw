// src/components/admin/CarriageManagement.tsx
import React, { useEffect, useState } from "react";
import TabContent from "./TabContent";
import adminApiRequests from "@/app/apiRequests/admin";
const CarriageManagement = () => {
    const [carriages, setCarriages] = useState<Railcar[]>([]); // Sử dụng interface Railcar
    const [loading, setLoading] = useState(false);
    interface Railcar {
        id: string;
        name: string;
        railcarType: string;
        capacity: number;
        seatPerRow: number;
        isHaveFloor: boolean;
    }

    // Fetch all carriages from API
    const fetchCarriages = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken") || "";
        try {
            const response = await adminApiRequests.railCar.getAll(accessToken);
            setCarriages(response.payload.result); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching carriages:", error);
        } finally {
            setLoading(false);
        }
    };

    // Add a new carriage
    const handleAddCarriage = async (newCarriage: any) => {
        const accessToken = localStorage.getItem("accessToken") || "";
        try {
            await adminApiRequests.railCar.create(newCarriage, accessToken);
            fetchCarriages(); // Refresh the carriage list
        } catch (error) {
            console.error("Error adding carriage:", error);
        }
    };

    useEffect(() => {
        fetchCarriages();
    }, []);

    const displayFields = [
        "id",
        "name",
        "railcarType",
        "capacity",
        "seatPerRow",
        "isHaveFloor",
    ];
    const addFields = [
        { name: "name", label: "Tên toa", type: "text" },
        { name: "railcarType", label: "loại toa", type: "text" },
        { name: "capacity", label: "số lượng ghế", type: "text" },
        { name: "seatPerRow", label: "số ghế mỗi hàng", type: "text" },
        { name: "isHaveFloor", label: "Có sàn hay không", type: "boolean" },
    ];

    return (
        <TabContent
            title="Quản lý Toa"
            displayFields={displayFields}
            addFields={addFields}
            data={carriages.map((carriage) => ({
                id: carriage.id,
                name: carriage.name,
                railcarType: carriage.railcarType,
                capacity: carriage.capacity,
                seatPerRow: carriage.seatPerRow,
                isHaveFloor: carriage.isHaveFloor.toString(),
            }))}
            onAdd={handleAddCarriage}
            loading={loading}
        />
    );
}

export default CarriageManagement;
