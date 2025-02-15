import unicodedata
from .repository import AcomodacaoRepository

def normalize(text: str) -> str:
    return unicodedata.normalize('NFKD', text).encode('ASCII', 'ignore').decode('ASCII').lower()

class AcomodacaoService:
    def __init__(self, repository: AcomodacaoRepository):
        self._repository = repository

    def listar_acomodacoes(self, filters: dict = None):
        try:
            if filters is None:
                filters = {}
            results = self._repository.get_all()
            
            # Filtro por cidade
            if filters.get("cidade"):
                search = normalize(filters["cidade"])
                results = [r for r in results if search in normalize(r.get("cidade", ""))]
            # Filtro por tipo de imóvel
            if filters.get("tipo_imovel"):
                search = normalize(filters["tipo_imovel"])
                results = [r for r in results if search in normalize(r.get("tipo_imovel") or "")]
            # Faixa de preço
            if filters.get("minPrice") is not None:
                results = [r for r in results if r.get("preco_noite", 0) >= float(filters["minPrice"])]
            if filters.get("maxPrice") is not None:
                results = [r for r in results if r.get("preco_noite", 0) <= float(filters["maxPrice"])]
            # Faixa de avaliação
            if filters.get("minRating") is not None:
                results = [r for r in results if (r.get("avaliacao") or 0) >= float(filters["minRating"])]
            if filters.get("maxRating") is not None:
                results = [r for r in results if (r.get("avaliacao") or 0) <= float(filters["maxRating"])]
            # Número de quartos
            if filters.get("minQuartos") is not None:
                results = [r for r in results if (r.get("quartos") or 0) >= int(filters["minQuartos"])]
            if filters.get("maxQuartos") is not None:
                results = [r for r in results if (r.get("quartos") or 0) <= int(filters["maxQuartos"])]
            # Número de banheiros
            if filters.get("minBanheiros") is not None:
                results = [r for r in results if (r.get("banheiros") or 0) >= int(filters["minBanheiros"])]
            if filters.get("maxBanheiros") is not None:
                results = [r for r in results if (r.get("banheiros") or 0) <= int(filters["maxBanheiros"])]
            # amenities (normalizando cada amenitie)
            if filters.get("amenities"):
                amenitie_list = [normalize(f.strip()) for f in filters["amenities"].split(",") if f.strip()]
                results = [r for r in results if all(feat in [normalize(x) for x in r.get("amenities", [])] for feat in amenitie_list)]
            
            return results
        except Exception as e:
            raise Exception("Erro ao listar acomodações: " + str(e))

    def obter_acomodacao(self, id: int):
        try:
            return self._repository.get_by_id(id)
        except Exception as e:
            raise Exception("Erro ao obter acomodação: " + str(e))
