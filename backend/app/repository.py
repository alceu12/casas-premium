import json
import os
from typing import List, Dict, Any
from .models import Acomodacao

class AcomodacaoRepository:
    def __init__(self):
        self._data_file = os.path.join(os.path.dirname(__file__), 'data', 'db.json')
        self._acomodacoes = self._load_data()

    def _load_data(self) -> List[Dict[str, Any]]:
        try:
            with open(self._data_file, 'r', encoding='utf-8') as file:
                data = json.load(file)
                return data
        except FileNotFoundError:
            raise Exception(f"Arquivo de dados não encontrado: {self._data_file}")
        except json.JSONDecodeError:
            raise Exception("Erro ao decodificar o arquivo JSON")

    def get_all(self) -> List[Dict[str, Any]]:
        return self._acomodacoes

    def get_by_id(self, id: int) -> Dict[str, Any]:
        for acomodacao in self._acomodacoes:
            if acomodacao.get("id") == id:
                return acomodacao
        return None
