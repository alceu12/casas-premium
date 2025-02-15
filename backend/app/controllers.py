from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from .models import Acomodacao
from .repository import AcomodacaoRepository
from .service import AcomodacaoService

repository = AcomodacaoRepository()
service = AcomodacaoService(repository)

router = APIRouter()

@router.get("/acomodacoes", response_model=List[Acomodacao])
def get_acomodacoes(
    cidade: Optional[str] = Query(None, description="Nome da cidade"),
    estado: Optional[str] = Query(None, description="Sigla do estado"),
    tipo_imovel: Optional[str] = Query(None, description="Tipo de imóvel (ex.: Casa, Apartamento, Chalé)"),
    minPrice: Optional[float] = Query(None, description="Preço mínimo"),
    maxPrice: Optional[float] = Query(None, description="Preço máximo"),
    minRating: Optional[float] = Query(None, description="Avaliação mínima"),
    maxRating: Optional[float] = Query(None, description="Avaliação máxima"),
    minQuartos: Optional[int] = Query(None, description="Número mínimo de quartos"),
    maxQuartos: Optional[int] = Query(None, description="Número máximo de quartos"),
    minBanheiros: Optional[int] = Query(None, description="Número mínimo de banheiros"),
    maxBanheiros: Optional[int] = Query(None, description="Número máximo de banheiros"),
    amenities: Optional[str] = Query(None, description="Amenidades separadas por vírgula (ex.: Wi-Fi, Ar Condicionado)"),
):
    filters = {
        "cidade": cidade,
        "estado": estado,
        "tipo_imovel": tipo_imovel,
        "minPrice": minPrice,
        "maxPrice": maxPrice,
        "minRating": minRating,
        "maxRating": maxRating,
        "minQuartos": minQuartos,
        "maxQuartos": maxQuartos,
        "minBanheiros": minBanheiros,
        "maxBanheiros": maxBanheiros,
        "amenities": amenities,
    }
    try:
        acomodacoes = service.listar_acomodacoes(filters)
        return acomodacoes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/acomodacoes/{id}", response_model=Acomodacao)
def get_acomodacao(id: int):
    try:
        acomodacao = service.obter_acomodacao(id)
        if not acomodacao:
            raise HTTPException(status_code=404, detail="Acomodação não encontrada")
        return acomodacao
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
