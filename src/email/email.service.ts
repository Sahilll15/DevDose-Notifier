import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(
      this.configService.get<string>('SENDGRID_API_KEY') as string,
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<boolean> {
    try {
      const emailData = {
        from: this.configService.get<string>('EMAIL'),
        to,
        subject,
        html: this.formatEmailContent(content),
      };

      await sgMail.send(emailData as any);
      this.logger.log(`Email sent successfully to: ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error.message);
      return false;
    }
  }
  private enhancedMarkdownToHtml(markdown: string): string {
    let html = markdown
      .replace(
        /\*\*Topic Area:\*\*\s*\[([^\]]+)\]/g,
        '<h2>🎯 Topic Area: $1</h2>',
      )
      .replace(/\*\*Title:\*\*\s*\[([^\]]+)\]/g, '<h2>📖 $1</h2>')
      .replace(/\*\*📄 Description:\*\*/g, '<h3>📄 Description</h3>')
      .replace(
        /\*\*🧠 Key Concepts & Insights:\*\*/g,
        '<h3>🧠 Key Concepts & Insights</h3>',
      )
      .replace(
        /\*\*🚀 Actionable Steps \/ Code Example:\*\*/g,
        '<h3>🚀 Actionable Steps / Code Example</h3>',
      )
      .replace(/\*\*📚 Further Reading:\*\*/g, '<h3>📚 Further Reading</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/^\* (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.*)$/gm, '<p>$1</p>')
      .replace(/<p><h[2-6]>/g, '<h2>')
      .replace(/<p><h[2-6]>/g, '<h3>')
      .replace(/<p><h[2-6]>/g, '<h4>')
      .replace(/<\/h[2-6]><\/p>/g, '</h2>')
      .replace(/<\/h[2-6]><\/p>/g, '</h3>')
      .replace(/<\/h[2-6]><\/p>/g, '</h4>')
      .replace(/<p><li>/g, '<li>')
      .replace(/<\/li><\/p>/g, '</li>')
      .replace(/<p><ul>/g, '<ul>')
      .replace(/<p><ol>/g, '<ol>')
      .replace(/<\/ul><\/p>/g, '</ul>')
      .replace(/<\/ol><\/p>/g, '</ol>')
      .replace(/<p><pre>/g, '<pre>')
      .replace(/<\/pre><\/p>/g, '</pre>')
      .replace(/<p><code>/g, '<code>')
      .replace(/<\/code><\/p>/g, '</code>')
      .replace(/<p>\s*<\/p>/g, '')
      .replace(/<li><\/li>/g, '');

    const listItems = html.match(/<li>.*?<\/li>/g);
    if (listItems && listItems.length > 0) {
      const listStart = html.indexOf('<li>');
      const listEnd = html.lastIndexOf('</li>') + 6;
      const listContent = html.substring(listStart, listEnd);
      const isOrdered =
        listContent.includes('1.') ||
        listContent.includes('2.') ||
        listContent.includes('3.');
      const listTag = isOrdered ? 'ol' : 'ul';
      html =
        html.substring(0, listStart) +
        `<${listTag}>${listContent}</${listTag}>` +
        html.substring(listEnd);
    }

    return html;
  }

  private formatEmailContent(content: string): string {
    const formattedContent = this.enhancedMarkdownToHtml(content);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Daily Learning Topic</title>
          <style>
            * { 
              margin: 0; 
              padding: 0; 
              box-sizing: border-box; 
            }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; 
              line-height: 1.7; 
              color: #ffffff; 
              background: #0a0a0a;
              padding: 20px;
              min-height: 100vh;
            }
            .container { 
              max-width: 700px; 
              margin: 0 auto; 
              background: #111111; 
              border-radius: 20px; 
              box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
              overflow: hidden;
              border: 1px solid #27272a;
            }
            .header { 
              background: linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%);
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
              pointer-events: none;
            }
            .header h1 { 
              font-size: 28px; 
              font-weight: 900; 
              margin-bottom: 8px;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
              position: relative;
              z-index: 1;
            }
            .header p {
              font-size: 16px;
              opacity: 0.9;
              position: relative;
              z-index: 1;
            }
            .content { 
              padding: 40px 30px; 
              background: #111111; 
              color: #ffffff;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .content h2 { 
              font-size: 24px; 
              color: #00d4ff; 
              margin: 30px 0 15px 0;
              font-weight: 700;
              border-left: 4px solid #00d4ff;
              padding-left: 15px;
              display: flex;
              align-items: center;
            }
            .content h3 { 
              font-size: 20px; 
              color: #a1a1aa; 
              margin: 25px 0 12px 0;
              font-weight: 600;
              display: flex;
              align-items: center;
            }
            .content h4 { 
              font-size: 18px; 
              color: #7c3aed; 
              margin: 20px 0 10px 0;
              font-weight: 600;
              display: flex;
              align-items: center;
            }
            .content p { 
              margin-bottom: 16px; 
              font-size: 16px;
              color: #a1a1aa;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .content strong { 
              color: #ffffff; 
              font-weight: 600;
            }
            .content code {
              background: #1a1a1a;
              padding: 4px 8px;
              border-radius: 6px;
              font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
              font-size: 14px;
              color: #00d4ff;
              border: 1px solid #27272a;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .content pre {
              background: #0a0a0a;
              color: #ffffff;
              padding: 20px;
              border-radius: 12px;
              overflow-x: auto;
              margin: 20px 0;
              font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
              font-size: 14px;
              line-height: 1.5;
              border: 1px solid #27272a;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .content pre code {
              background: transparent;
              border: none;
              padding: 0;
              color: inherit;
            }
            .content ul, .content ol {
              margin: 16px 0;
              padding-left: 25px;
            }
            .content li {
              margin-bottom: 8px;
              color: #a1a1aa;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .content blockquote {
              border-left: 4px solid #00d4ff;
              background: #1a1a1a;
              padding: 20px;
              margin: 20px 0;
              border-radius: 0 12px 12px 0;
              font-style: italic;
              color: #a1a1aa;
            }
            .content a {
              color: #00d4ff;
              text-decoration: none;
              word-wrap: break-word;
              overflow-wrap: break-word;
            }
            .content a:hover {
              text-decoration: underline;
            }
            .footer { 
              text-align: center; 
              padding: 30px; 
              background: #0a0a0a;
              border-top: 1px solid #27272a;
            }
            .footer p {
              color: #71717a;
              font-size: 14px;
              margin-bottom: 8px;
            }
            .footer .brand {
              font-weight: 600;
              color: #ffffff;
            }
            .emoji {
              font-size: 1.2em;
              margin-right: 8px;
            }
            .topic-badge {
              display: inline-block;
              background: linear-gradient(135deg, #00d4ff, #7c3aed);
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              margin-bottom: 10px;
            }
            .highlight-box {
              background: rgba(0, 212, 255, 0.1);
              border: 1px solid rgba(0, 212, 255, 0.3);
              border-radius: 12px;
              padding: 20px;
              margin: 20px 0;
            }
            @media (max-width: 600px) {
              body { 
                padding: 10px; 
                font-size: 14px;
              }
              .container { 
                margin: 0; 
                border-radius: 12px;
              }
              .header, .content, .footer { 
                padding: 20px; 
              }
              .header h1 { 
                font-size: 24px; 
              }
              .content h2 { 
                font-size: 20px; 
              }
              .content h3 { 
                font-size: 18px; 
              }
              .content pre {
                padding: 15px;
                font-size: 12px;
              }
            }
            @media (max-width: 480px) {
              .content {
                padding: 15px;
              }
              .header {
                padding: 25px 15px;
              }
              .footer {
                padding: 20px 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1><span class="emoji">📚</span>Daily Learning Topic</h1>
              <p>Your daily dose of technical knowledge</p>
            </div>
            <div class="content">
              ${formattedContent}
            </div>
            <div class="footer">
              <p>Happy Learning! <span class="emoji">🚀</span></p>
              <p class="brand">Learning Notifier</p>
              <p><small>Empowering developers with daily insights</small></p>
              <p><small>Built with ❤️ by developers, for developers</small></p>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
