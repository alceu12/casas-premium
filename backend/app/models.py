from pydantic import BaseModel, Field
from typing import List, Optional

class Acomodacao(BaseModel):
    id: int = Field(..., description="Identificador único da acomodação")
    nome: str = Field(..., description="Nome da acomodação")
    imagem: str = Field(..., description="URL da imagem da acomodação")
    preco_noite: float = Field(..., description="Preço por noite")
    cidade: str = Field(..., description="Cidade da acomodação")
    estado: str = Field(..., description="Estado da acomodação")
    descricao: Optional[str] = Field(None, description="Descrição detalhada da acomodação")
    avaliacao: Optional[float] = Field(None, ge=0, le=5, description="Avaliação média (0 a 5)")
    amenities: Optional[List[str]] = Field(default_factory=list, description="Lista de amenidades")
    tipo_imovel: Optional[str] = Field(None, description="Tipo de Imóvel: Casa, Apartamento, Estúdio, Loft, Chalé")
    quartos: Optional[int] = Field(None, description="Número de quartos")
    banheiros: Optional[int] = Field(None, description="Número de banheiros")
    features: Optional[List[str]] = Field(default_factory=list, description="Características, ex.: Pet Friendly, Piscina, Estacionamento, Vista para o mar")
