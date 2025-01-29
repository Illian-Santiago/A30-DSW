import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Función para obtener los productos desde el endpoint
        const fetchProducts = async (page) => {
            try {
                const response = await axios.get(`/api/products?page=${page}`);
                setProducts(response.data.data); // Asumiendo que los datos están en response.data.data
                setTotalPages(response.data.total_pages); // Asumiendo que el total de páginas está en response.data.total_pages
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts(currentPage);
    }, [currentPage]); // Dependencia en currentPage para recargar cuando cambie la página

    if (loading) return <div className="text-center text-gray-500">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error}</div>;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Lista de productos</h1>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(product => (
                        <li key={product.id} className="border rounded-lg p-4 shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700 mb-2">{product.description}</p>
                            <p className="text-gray-900 font-bold mb-2">Price: ${product.price}</p>
                            <p className="text-gray-700 mb-2">Stock: {product.stock}</p>
                            <img className="w-full h-48 object-cover rounded" src={product.image} alt={product.name} />
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-4">
                    <button
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}