const About = () => {
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        About the North Inishowen Pool League
      </h1>
      <div className="space-y-6 text-gray-800">
        <section>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1">
            Our History
          </h2>
          <p>
            The North Inishowen Pool League has been a cornerstone of the local
            community for decades, bringing together players of all skill levels
            to compete in a friendly yet competitive environment.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1">
            League Structure
          </h2>
          <p>
            The league is divided into two divisions (Division One and Division
            Two) to ensure balanced competition. Matches are typically held on
            Friday nights across various venues in the North Inishowen area.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 border-b pb-1">
            Rules and Regulations
          </h2>
          <p>
            We adhere to standard Internaional 8 ball rules, with some local
            variations agreed upon by the league committee. For more details on
            the rules, please contact your team captain or a league official.
          </p>
        </section>

        <section className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Get Involved</h2>
          <p>
            Looking to join a team or register a new venue? We're always looking
            for new talent! Send us a message or speak to any of our members at
            the next match night.
          </p>
        </section>
      </div>
    </main>
  );
};

export default About;
