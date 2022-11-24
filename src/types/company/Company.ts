export enum SectorType {
  AGRICULTURE_PECHE = 'AGRICULTURE_PECHE',
  ARTS = 'ARTS',
  BANQUE_ASSURANCE_IMMOBILIER = 'BANQUE_ASSURANCE_IMMOBILIER',
  COMMERCE_GRANDE_DISTRIBUTION = 'COMMERCE_GRANDE_DISTRIBUTION',
  COM_MEDIA = 'COM_MEDIA',
  CONSTRUCTION_BATIMENT_TRAVAUX_PUBLICS = 'CONSTRUCTION_BATIMENT_TRAVAUX_PUBLICS',
  HOTELLERIE_RESTAURATION = 'HOTELLERIE_RESTAURATION',
  TOURISME_LOISIRS = 'TOURISME_LOISIRS',
  INDUSTRIE = 'INDUSTRIE',
}

export type Company = {
  id: String
  name: String;
  email: String;
  employeesNumber: String;
  description: String;
  sector: SectorType;
  pictureUrl?: String;
};

export type CompanyFilters = {
  companyName?: string
  sector?: SectorType
};
