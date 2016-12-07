using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NgMvc5LoginRegistration.Startup))]
namespace NgMvc5LoginRegistration
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
