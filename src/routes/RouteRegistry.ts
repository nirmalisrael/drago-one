import type { ModuleRouteConfig, ModuleRoute } from './types';

class RouteRegistryClass {
  private readonly modules: Map<string, ModuleRouteConfig> = new Map();
  private initialized = false;

  // Register a module's routes
  register(moduleConfig: ModuleRouteConfig) {
    if (this.modules.has(moduleConfig.moduleName)) {
      console.warn(`Module ${moduleConfig.moduleName} is already registered`);
      return;
    }

    this.modules.set(moduleConfig.moduleName, moduleConfig);
    console.log(`📍 Registered routes for module: ${moduleConfig.moduleName}`);
  }

  // Get all registered routes (flattened)
  getAllRoutes(): ModuleRoute[] {
    const allRoutes: ModuleRoute[] = [];

    this.modules.forEach((moduleConfig) => {
      const processRoutes = (routes: ModuleRoute[], basePath: string = '') => {
        routes.forEach(route => {
          // Combine module base path with route path
          const fullPath = basePath + route.path;
          allRoutes.push({ ...route, path: fullPath });

          // Process children recursively
          if (route.children) {
            processRoutes(route.children, fullPath);
          }
        });
      };

      processRoutes(moduleConfig.routes, moduleConfig.basePath);
    });

    return allRoutes;
  }

  // Get routes for menu generation
  getMenuRoutes(): ModuleRouteConfig[] {
    return Array.from(this.modules.values())
      .sort((a, b) => (a.menuGroup?.order || 999) - (b.menuGroup?.order || 999));
  }

  // Get routes by module
  getModuleRoutes(moduleName: string): ModuleRouteConfig | undefined {
    return this.modules.get(moduleName);
  }

  // Initialize all modules (lazy load route configs)
  async initialize() {
    if (this.initialized) return;

    console.log('🚀 Initializing route modules...');

    // Auto-register all modules
    await Promise.all([
      this.loadModule('dashboard')
    ]);

    this.initialized = true;
    console.log(`✅ Loaded ${this.modules.size} route modules`);
  }

  private async loadModule(moduleName: string) {
    try {
      const moduleRoutes = await import(`../modules/${moduleName}/routes.ts`);
      if (moduleRoutes.default && typeof moduleRoutes.default.getRoutes === 'function') {
        this.register(moduleRoutes.default.getRoutes());
        console.log('Loaded routes: ', moduleRoutes.default.getRoutes());

      }
    } catch (error) {
      console.warn(`⚠️  Failed to load routes for module: ${moduleName}`, error);
    }
  }

  // Clear all routes (for testing)
  clear() {
    this.modules.clear();
    this.initialized = false;
  }
}

export const RouteRegistry = new RouteRegistryClass();