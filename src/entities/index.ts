/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: moodboard
 * Interface for Moodboard
 */
export interface Moodboard {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image */
  image?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  sourceUrl?: string;
  /** @wixFieldType text */
  tags?: string;
}


/**
 * Collection ID: projectgalleryimages
 * Interface for ProjectGalleryImages
 */
export interface ProjectGalleryImages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  imageFile?: string;
  /** @wixFieldType text */
  projectId?: string;
  /** @wixFieldType text */
  altText?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  fullDescription?: string;
  /** @wixFieldType text */
  streamCategory?: string;
  /** @wixFieldType image */
  thumbnailImage?: string;
  /** @wixFieldType image */
  detailImage1?: string;
  /** @wixFieldType image */
  detailImage2?: string;
  /** @wixFieldType image */
  detailImage3?: string;
  /** @wixFieldType text */
  projectYear?: string;
}
