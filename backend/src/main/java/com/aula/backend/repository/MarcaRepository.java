package com.aula.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aula.backend.entity.Marca;

public interface MarcaRepository extends JpaRepository<Marca, Long>{
    
}
