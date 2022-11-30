import i18next from 'i18next';

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

export function getSectorTypeTranslation(sector: SectorType) {
  return i18next.t(`sector-type-${sector.toString().toLowerCase().replace('_', '-')}`);
}

export type Company = {
  id: string
  name: string;
  email: string;
  employeesNumber: number;
  slogan: string;
  description: string;
  sector: SectorType;
  pictureUrl?: string;
};

export type CompanyFilters = {
  companyName?: string
  sector?: SectorType
};
