import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  private readonly adminCode: string;

  constructor(private readonly configService: ConfigService) {
    this.adminCode = this.configService.get<string>('ADMIN_CODE') || 'ADMIN123';
  }

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api') && req.path !== '/swagger-auth/verify') {
      const authCookie = req.cookies['swagger-auth'];
      const authHeader = req.headers.authorization;
      const queryCode = req.query.code as string;

      if (
        authCookie === 'authenticated' ||
        authHeader === `Bearer ${this.adminCode}` ||
        queryCode === this.adminCode
      ) {
        return next();
      }

      if (req.path === '/api' || req.path === '/api/') {
        return res.status(401).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>API Documentation Access</title>
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  margin: 0; 
                  padding: 0; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  min-height: 100vh;
                }
                .container { 
                  background: white; 
                  padding: 40px; 
                  border-radius: 16px; 
                  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                  text-align: center;
                  max-width: 400px;
                  width: 90%;
                }
                h1 { color: #2d3748; margin-bottom: 20px; }
                p { color: #4a5568; margin-bottom: 30px; }
                .form-group { margin-bottom: 20px; }
                input { 
                  width: 100%; 
                  padding: 12px; 
                  border: 2px solid #e2e8f0; 
                  border-radius: 8px; 
                  font-size: 16px;
                  box-sizing: border-box;
                }
                input:focus { 
                  outline: none; 
                  border-color: #667eea; 
                }
                button { 
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white; 
                  border: none; 
                  padding: 12px 30px; 
                  border-radius: 8px; 
                  font-size: 16px; 
                  cursor: pointer;
                  width: 100%;
                }
                button:hover { opacity: 0.9; }
                .error { color: #e53e3e; margin-top: 10px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>🔐 API Documentation Access</h1>
                <p>Enter the admin code to access the API documentation:</p>
                <form action="/swagger-auth/verify" method="GET">
                  <div class="form-group">
                    <input type="password" name="code" placeholder="Enter admin code" required>
                  </div>
                  <button type="submit">Access Documentation</button>
                </form>
                <div class="error" id="error"></div>
              </div>
              <script>
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('error') === 'unauthorized') {
                  document.getElementById('error').textContent = 'Invalid access code. Please try again.';
                }
              </script>
            </body>
          </html>
        `);
      }

      throw new UnauthorizedException('Access denied to API documentation');
    }

    next();
  }
}
