package com.aula.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aula.backend.entity.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long>{
    
}
