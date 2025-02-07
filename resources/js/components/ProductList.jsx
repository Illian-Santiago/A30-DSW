import React, { useState, useEffect } from 'react';

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
                const response = await fetch(`/api/products?page=${page}`, { credentials: "include" });

                if (response.redirected) { // Si la respuesta ha sido redirigida
                    window.location.href = response.url; // Redirige el navegador a la nueva URL
                    return;
                }

                const data = await response.json();

                setProducts(data.data);
                setTotalPages(data.meta.last_page);
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

    const deleteProduct = async (productId) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

        try {
            fetch('/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            })

            fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            alert("Producto eliminado correctamente");
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error("Error eliminando el producto:", error);
        }
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
                            <p className="text-gray-700 mb-2">Autor: {product.user_id}</p>

                            <img className="w-full h-48 object-cover rounded" src={product.image} alt={product.name} />

                            <button onClick={() => deleteProduct(product.id)}>
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center mt-4">
                    <button onClick={() => handlePageChange(currentPage - 1)} className={'px-4 py-2 mx-1 border rounded bg-white'} disabled={currentPage === 1} >
                        Previous
                    </button>

                    <button className={'px-4 py-2 mx-1 border rounded bg-white'}>
                        {currentPage}/{totalPages}
                    </button>

                    <button onClick={() => handlePageChange(currentPage + 1)} className={'px-4 py-2 mx-1 border rounded bg-white'} disabled={currentPage === totalPages} >
                        Next
                    </button>
                </div>
            </div >
        </>
    );
}