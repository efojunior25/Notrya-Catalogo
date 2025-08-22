package com.xunim.notryaCatalogo.repository;

import com.xunim.notryaCatalogo.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Listar produtos ativos por IDs
    @Query("SELECT p FROM Product p WHERE p.id IN :ids AND p.active = true")
    List<Product> findActiveProductByIds(@Param("ids") List<Long> ids);

    // Busca principal com filtros múltiplos para roupas
    @Query("SELECT p FROM Product p WHERE p.active = true " +
            "AND (:search IS NULL OR :search = '' OR " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:category IS NULL OR p.category = :category) " +
            "AND (:gender IS NULL OR p.gender = :gender) " +
            "AND (:color IS NULL OR p.color = :color) " +
            "AND (:size IS NULL OR p.size = :size) " +
            "AND (:brand IS NULL OR :brand = '' OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :brand, '%')))")
    Page<Product> findProductsWithFilters(
            @Param("search") String search,
            @Param("category") Product.ProductCategory category,
            @Param("gender") Product.Gender gender,
            @Param("color") Product.Color color,
            @Param("size") Product.Size size,
            @Param("brand") String brand,
            Pageable pageable
    );

    // Busca simples por nome (mantida para compatibilidade)
    @Query("SELECT p FROM Product p WHERE p.active = true AND " +
            "(:search IS NULL OR :search = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findActiveProductsByName(@Param("search") String search, Pageable pageable);

    // Buscar por categoria
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.category = :category")
    Page<Product> findByCategory(@Param("category") Product.ProductCategory category, Pageable pageable);

    // Buscar por gênero
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.gender = :gender")
    Page<Product> findByGender(@Param("gender") Product.Gender gender, Pageable pageable);

    // Buscar por marca
    @Query("SELECT p FROM Product p WHERE p.active = true AND LOWER(p.brand) LIKE LOWER(CONCAT('%', :brand, '%'))")
    Page<Product> findByBrand(@Param("brand") String brand, Pageable pageable);

    // Produtos em promoção (por exemplo, estoque baixo)
    @Query("SELECT p FROM Product p WHERE p.active = true AND p.stock <= :lowStock")
    Page<Product> findLowStockProducts(@Param("lowStock") Integer lowStock, Pageable pageable);

    // Produtos mais recentes
    @Query("SELECT p FROM Product p WHERE p.active = true ORDER BY p.createdAt DESC")
    Page<Product> findNewestProducts(Pageable pageable);

    // Top 3 produtos mais vendidos (atualizada para roupas)
    @Query(value = """
            SELECT p.id, p.name, p.description, p.price, p.stock, p.category, 
                   p.size, p.color, p.brand, p.material, p.gender, p.image_url,
                   p.active, p.created_at, p.updated_at, p.version,
                   COALESCE(SUM(oi.quantity), 0) as total_sold
            FROM products p
            LEFT JOIN order_items oi ON p.id = oi.product_id
            WHERE p.active = true
            GROUP BY p.id, p.name, p.description, p.price, p.stock, p.category, 
                     p.size, p.color, p.brand, p.material, p.gender, p.image_url,
                     p.active, p.created_at, p.updated_at, p.version
            ORDER BY total_sold DESC
            LIMIT 3
            """, nativeQuery = true)
    List<Object[]> findTop3MostSoldProducts();

    // Buscar tamanhos disponíveis para um produto (mesmo nome, cor, categoria)
    @Query("SELECT DISTINCT p.size FROM Product p WHERE p.active = true " +
            "AND p.name = :name AND p.color = :color AND p.category = :category")
    List<Product.Size> findAvailableSizes(
            @Param("name") String name,
            @Param("color") Product.Color color,
            @Param("category") Product.ProductCategory category
    );

    // Buscar cores disponíveis para um produto
    @Query("SELECT DISTINCT p.color FROM Product p WHERE p.active = true " +
            "AND p.name = :name AND p.category = :category")
    List<Product.Color> findAvailableColors(
            @Param("name") String name,
            @Param("category") Product.ProductCategory category
    );

    // Produtos relacionados (mesma categoria e gênero)
    @Query("SELECT p FROM Product p WHERE p.active = true " +
            "AND p.category = :category AND p.gender = :gender " +
            "AND p.id != :excludeId")
    Page<Product> findRelatedProducts(
            @Param("category") Product.ProductCategory category,
            @Param("gender") Product.Gender gender,
            @Param("excludeId") Long excludeId,
            Pageable pageable
    );
}