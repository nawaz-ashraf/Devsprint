export type ProjectCategory = "Flutter Apps" | "Websites" | "Tools";

export interface ProjectLinks {
    details: string;
    playStore: string;
    demo?: string;
}

export interface ProjectItem {
    name: string;
    category: ProjectCategory;
    description: string;
    badges: string[];
    keyFeatures: string[];
    stack: string[];
    outcome: string;
    links: ProjectLinks;
    featured?: boolean;
}

export interface ServiceItem {
    name: string;
    description: string;
    icon: "code" | "phone" | "pen" | "rocket" | "dashboard" | "wrench" | "shield";
    highlights: string[];
}
