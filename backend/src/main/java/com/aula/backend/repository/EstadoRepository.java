package com.aula.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aula.backend.entity.Estado;

public interface EstadoRepository extends JpaRepository<Estado, Long>{
    
}
